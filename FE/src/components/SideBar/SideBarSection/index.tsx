import { ReactNode } from 'react';

import * as S from '@components/SideBar/SideBarSection/SideBarSection.style';
import Icon from '@components/common/Icon';
import { ICON_NAME, ICON_SIZE } from '@components/common/Icon/constants';

interface SideBarSectionPropsType {
  title: string;
  children?: ReactNode;
}

const SideBarSection = ({ title, children }: SideBarSectionPropsType) => {
  return (
    <S.Container>
      <S.AddButton>
        <S.Title>{title}</S.Title>
        <Icon iconName={ICON_NAME.ADD} iconSize={ICON_SIZE.SMALL} />
      </S.AddButton>
      {children}
    </S.Container>
  );
};

export default SideBarSection;
