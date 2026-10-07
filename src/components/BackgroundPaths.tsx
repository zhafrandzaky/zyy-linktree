'use client';

import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

// Pre-compute curve length for each path using cubic Bezier arc-length integration
function calculateCurveLength(i: number, position: number): number {
  const p0 = { x: -(380 - i * 5 * position), y: -(189 + i * 6) };
  const p1 = { x: -(380 - i * 5 * position), y: -(189 + i * 6) };
  const p2 = { x: -(312 - i * 5 * position), y: 216 - i * 6 };
  const p3 = { x: 152 - i * 5 * position, y: 343 - i * 6 };
  const p4 = { x: 616 - i * 5 * position, y: 470 - i * 6 };
  const p5 = { x: 684 - i * 5 * position, y: 875 - i * 6 };
  const p6 = { x: 684 - i * 5 * position, y: 875 - i * 6 };

  let len = 0;
  let last = p0;
  const steps = 60;
  for (let s = 1; s <= steps; s++) {
    const t = s / steps;
    let pt: { x: number; y: number };
    if (t <= 0.5) {
      const u = t * 2;
      const b0 = (1 - u) ** 3;
      const b1 = 3 * (1 - u) ** 2 * u;
      const b2 = 3 * (1 - u) * u ** 2;
      const b3 = u ** 3;
      pt = {
        x: b0 * p0.x + b1 * p1.x + b2 * p2.x + b3 * p3.x,
        y: b0 * p0.y + b1 * p1.y + b2 * p2.y + b3 * p3.y,
      };
    } else {
      const u = (t - 0.5) * 2;
      const b0 = (1 - u) ** 3;
      const b1 = 3 * (1 - u) ** 2 * u;
      const b2 = 3 * (1 - u) * u ** 2;
      const b3 = u ** 3;
      pt = {
        x: b0 * p3.x + b1 * p4.x + b2 * p5.x + b3 * p6.x,
        y: b0 * p3.y + b1 * p4.y + b2 * p5.y + b3 * p6.y,
      };
    }
    const dx = pt.x - last.x;
    const dy = pt.y - last.y;
    len += Math.sqrt(dx * dx + dy * dy);
    last = pt;
  }
  return len;
}

// Generate the 36 paths for a given position multiplier (1 or -1) exactly as in 21st.dev / zyy-porto
function generatePathData(position: number) {
  return Array.from({ length: 36 }, (_, i) => {
    const d = `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`;

    return {
      id: i,
      d,
      width: 0.6 + i * 0.03,
      // Ambient opacity tuned for linktree cards so paths are elegantly visible and never blend
      baseOpacity: 0.035 + i * 0.008,
      length: calculateCurveLength(i, position),
      // Slower, calmer and majestic duration (32s to 52s)
      duration: 32 + (i % 8) * 2.8,
    };
  });
}

// Pre-computed static arrays of path descriptions
const STATIC_PATHS_POS = generatePathData(1);
const STATIC_PATHS_NEG = generatePathData(-1);
const ALL_PATHS = [...STATIC_PATHS_POS, ...STATIC_PATHS_NEG];

interface BackgroundPathsProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  as?: 'main' | 'section' | 'div';
}

export function BackgroundPaths({
  children,
  className,
  id,
  as: Component = 'main',
}: BackgroundPathsProps) {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Cache pre-compiled native Path2D instances once in GPU memory
    const compiledPaths = ALL_PATHS.map((item) => ({
      ...item,
      path2d: new Path2D(item.d),
    }));

    let animationFrameId = 0;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let startTime = performance.now();
    let accumulatedTime = 0;

    const updateSize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
    };

    updateSize();

    // Resize listener
    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);

    const render = (now: number) => {
      if (!isVisible) {
        animationFrameId = 0;
        return;
      }

      accumulatedTime = now - startTime;
      const elapsedSeconds = accumulatedTime / 1000;

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Check current theme dynamically so theme toggle transitions seamlessly
      const isDark = document.documentElement.classList.contains('dark');

      // Transform from SVG viewBox (696 x 316) to Canvas viewport with High-DPI support
      ctx.save();
      ctx.setTransform(
        dpr * (width / 696),
        0,
        0,
        dpr * (height / 316),
        0,
        0
      );

      // Render all 72 curves in a single GPU-accelerated pass
      for (let i = 0; i < compiledPaths.length; i++) {
        const path = compiledPaths[i];
        const period = path.duration;
        // Sinusoidal oscillation matching the original 21st.dev motion [0, 1, 0]
        const theta = (2 * Math.PI * elapsedSeconds) / period;
        const s = (1 - Math.cos(theta)) / 2; // oscillates smoothly between 0 and 1

        // Exact physics:
        // pathLength goes from 0.3 to 1.0 to 0.3
        // pathOffset goes from 0 to 1.0 to 0
        // opacity breathes gently
        const currentLength = (0.3 + 0.7 * s) * path.length;
        const currentOffset = s * path.length;
        const currentOpacity = path.baseOpacity * (0.6 + 0.6 * s);

        ctx.lineWidth = path.width;
        // Theme-adaptive stroke color: luminous cool-slate in dark, subtle warm zinc in light
        const strokeColor = isDark
          ? `rgba(215, 225, 240, ${currentOpacity.toFixed(3)})`
          : `rgba(39, 39, 42, ${(currentOpacity * 0.75).toFixed(3)})`;

        ctx.strokeStyle = strokeColor;
        ctx.setLineDash([currentLength, path.length]);
        ctx.lineDashOffset = -currentOffset;
        ctx.stroke(path.path2d);
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    // Auto-pause when container is scrolled out of view (saves 100% CPU/GPU)
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          startTime = performance.now() - accumulatedTime;
          animationFrameId = requestAnimationFrame(render);
        }
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(container);

    // Auto-pause when browser tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false;
      } else {
        isVisible = true;
        startTime = performance.now() - accumulatedTime;
        if (!animationFrameId) {
          animationFrameId = requestAnimationFrame(render);
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <Component
      id={id}
      ref={containerRef as unknown as React.RefObject<HTMLDivElement>}
      className={cn(
        'relative min-h-dvh w-full overflow-x-hidden bg-background text-foreground transition-colors duration-200',
        className
      )}
    >
      {/* Background layer: strictly clipped to avoid horizontal overflow or scroll anomalies */}
      <div
        className="pointer-events-none absolute inset-0 select-none overflow-hidden"
        aria-hidden="true"
      >
        {/* High-performance ambient gradients (matches zyy-porto palette) */}
        <div
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[450px] opacity-25 dark:opacity-30 select-none [transform:translateZ(0)]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(234, 146, 22, 0.22) 0%, rgba(49, 56, 65, 0.08) 50%, transparent 70%)',
          }}
        />
        <div
          className="pointer-events-none absolute bottom-0 right-1/4 w-[500px] h-[350px] opacity-15 dark:opacity-20 select-none [transform:translateZ(0)]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(58, 71, 80, 0.25) 0%, transparent 70%)',
          }}
        />

        {/* Hardware-Accelerated Canvas Rendering of all 72 Paths */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none select-none [transform:translateZ(0)]"
        />

        {/* Atmospheric depth scrim: softens curves behind foreground text so typography stays 100% crisp & never blends */}
        <div className="pointer-events-none absolute inset-0 select-none bg-[radial-gradient(ellipse_75%_65%_at_50%_48%,rgba(250,250,250,0.65)_0%,rgba(250,250,250,0.25)_60%,transparent_100%)] dark:bg-[radial-gradient(ellipse_75%_65%_at_50%_48%,rgba(9,9,11,0.65)_0%,rgba(9,9,11,0.25)_60%,transparent_100%)] z-[1]" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {children}
      </div>
    </Component>
  );
}
