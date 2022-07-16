interface colorType {
  r: number;
  g: number;
  b: number;
}

//랜덤 color 구하기
const getRandomRGB = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return { r, g, b };
};

//유효한 RGB인지 체크
const isValidColorCode = (RGB: colorType) => RGBToString(RGB).length >= 7;

//유효한 RBG값만 반환
const getValidColorCode = (): colorType => {
  let RGB = getRandomRGB();
  while (!isValidColorCode(RGB)) RGB = getRandomRGB();
  return RGB;
};

//RGB값으로 colorCode 구하기
const numToHex = (num: number) => num.toString(16).toUpperCase();

const RGBToString = ({ r, g, b }: colorType): string =>
  `#${numToHex(r)}${numToHex(g)}${numToHex(b)}`;

//backgroundColor, testColor 구하기
export const getRandomLabelColor = (): string => {
  const randomColor = getValidColorCode();

  const backgroundColorCode = RGBToString(randomColor);

  return backgroundColorCode;
};
