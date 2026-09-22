/**
 * Type definitions for personal link-in-bio application
 */

export type SupportedIcon =
  | 'Saweria'
  | 'Sociabuzz'
  | 'Instagram'
  | 'Discord'
  | 'Github';

export interface ProfileLink {
  title: string;
  url: string;
  icon: SupportedIcon;
  highlighted?: boolean;
}

export interface ProfileData {
  name: string;
  handle: string;
  avatarSrc: string;
  links: ProfileLink[];
}
