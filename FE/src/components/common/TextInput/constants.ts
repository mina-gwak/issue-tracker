export const INPUT_SIZE = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
} as const;

type InputSizeKeys = keyof typeof INPUT_SIZE;

export type InputSizeValues = typeof INPUT_SIZE[InputSizeKeys];

export const INPUT_STATUS = {
  NORMAL: 'normal',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

type InputStatusKeys = keyof typeof INPUT_STATUS;

export type InputStatusValues = typeof INPUT_STATUS[InputStatusKeys];
