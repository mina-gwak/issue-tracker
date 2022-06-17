import { DefaultTheme } from 'styled-components';

const colors = {
  black: '#14142B',
  grey1: '#4E4B66',
  grey2: '#6E7191',
  grey3: '#A0A3BD',
  grey4: '#D9DBE9',
  grey5: '#EFF0F6',
  grey6: '#F7F7FC',
  white: '#FEFEFE',
  blue: '#007AFF',
  lightBlue: '#C7EBFF',
  darkBlue: '#004DE3',
  purple: '#0025E7',
  lightPurple: '#CCD4FF',
  darkPurple: '#020070',
  red: '#FF3B30',
  lightRed: '#FFD1CF',
  darkRed: '#C60B00',
  green: '#34C759',
  lightGreen: '#DDFFE6',
  darkGreen: '#00A028',
};

const fontSizes = {
  display: '2rem', // 32px
  large: '1.5rem', // 24px
  medium: '1.125rem', // 18px
  small: '1rem', // 16px
  xSmall: '0.75rem', // 12px
};

const fontWeights = {
  bold: '700',
  regular: '400',
};

export type ColorType = typeof colors;
export type FontSizeType = typeof fontSizes;
export type FontWeightType = typeof fontWeights;

export const theme: DefaultTheme = {
  colors,
  fontSizes,
  fontWeights,
};