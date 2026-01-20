
export interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon: string;
  visible: boolean;
}

export interface ProfileData {
  name: string;
  bio: string;
  avatarUrl: string;
  theme: string;
  links: LinkItem[];
  socials: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export type ThemeType = 'glass' | 'midnight' | 'sunset' | 'minimal' | 'neon';

export interface ThemeConfig {
  background: string;
  card: string;
  text: string;
  accent: string;
  button: string;
}
