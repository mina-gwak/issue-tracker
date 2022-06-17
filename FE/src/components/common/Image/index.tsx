import { Images, ImagesType } from '@assets/images';

export interface ImagePropsType {
  imageName: ImagesType;
}

const Image = ({ imageName }: ImagePropsType) => {
  return <img src={Images[imageName]} alt={imageName} />;
};

export default Image;
