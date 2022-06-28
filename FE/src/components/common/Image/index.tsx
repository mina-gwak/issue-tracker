import * as S from '@components/common/Image/Image.style';

export interface ImagePropsType {
  url: string;
  alt: string;
  size?: string;
}

const Image = ({ url, alt, size }: ImagePropsType) => {
  return <S.Image src={url} alt={alt} size={size} />;
};

export default Image;
