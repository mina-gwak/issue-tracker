import Github from '@assets/icons/github.svg';

export const Icons = {
  Github,
} as const;

export type IconsType = keyof typeof Icons;
