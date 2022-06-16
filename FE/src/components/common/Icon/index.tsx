import { Icons } from '@assets/icons';
import * as S from '@components/common/Icon/Icon.style';

export interface IconPropsType {
  iconName: string;
  iconSize: string;
}

const Icon = ({ iconName, iconSize }: IconPropsType) => {
  return <S.Icon src={Icons[iconName]} size={iconSize} />;
};

export default Icon;
