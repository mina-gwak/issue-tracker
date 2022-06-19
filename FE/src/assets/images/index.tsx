import LargeLogo from '@assets/images/LargeLogo.webp';

export const Images = {
  LargeLogo,
} as const;

export type ImagesType = keyof typeof Images;
