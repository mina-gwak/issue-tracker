import { Images } from '@assets/images';

export interface ImagePropsType {
  imageName: string;
}

const Image = ({ imageName }: ImagePropsType) => {
  return <img src={Images[imageName]} />;
};

export default Image;
