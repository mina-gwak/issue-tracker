import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import Image from '@components/common/Image';
import * as S from '@components/common/Modal/Modal.style';
import { DropdownType } from '@type/dropdownType';

import { IMAGE_SIZE } from '../Image/constants';
export interface ModalPropsType {
  data: DropdownType[];
  title: string;
  position?: string;
}

const Modal = ({ data, title, position = 'left' }: ModalPropsType) => {
  const CheckBoxIcon = true ? (
    <Icon iconName={ICON_NAME.CHECKBOX_CIRCLE_ACTIVE} />
  ) : (
    <Icon iconName={ICON_NAME.CHECKBOX_CIRCLE_INITIAL} />
  );

  return (
    <S.MenuList position={position}>
      <S.MenuTitle>{title} 필터</S.MenuTitle>
      {data.map(({ id, optionName, circleIcon, colorIcon }) => (
        <S.MenuOptionGroup key={id}>
          <S.MenuOptionItem>
            {circleIcon && <Image url={circleIcon} alt={optionName} size={IMAGE_SIZE.SMALL} />}

            {colorIcon && <S.CircleColorIcon colorIcon={colorIcon} />}

            <S.MenuItemOption>{optionName}</S.MenuItemOption>
          </S.MenuOptionItem>
          {CheckBoxIcon}
        </S.MenuOptionGroup>
      ))}
    </S.MenuList>
  );
};

export default Modal;
