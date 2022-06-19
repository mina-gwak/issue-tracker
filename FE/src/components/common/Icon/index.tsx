import { Icons, IconsType } from '@assets/icons';
import * as S from '@components/common/Icon/Icon.style';

export interface IconPropsType {
  iconName: IconsType;
  iconSize: string;
}

const Icon = ({ iconName, iconSize }: IconPropsType) => {
  return <S.Icon src={Icons[iconName]} size={iconSize} alt={iconName} />;
};

export default Icon;
