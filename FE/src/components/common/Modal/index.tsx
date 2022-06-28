import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import Image from '@components/common/Image';
import { IMAGE_SIZE } from '@components/common/Image/constants';
import * as S from '@components/common/Modal/Modal.style';
import { POSITION } from '@components/common/Modal/constants';
import { DropdownType } from '@type/dropdownType';

export interface ModalPropsType {
  data: DropdownType[];
  title: string;
  position?: string;
}

const isChecked = true;

const Modal = ({ data, title, position = POSITION.LEFT }: ModalPropsType) => {
  const checkBoxIcon = isChecked
    ? ICON_NAME.CHECKBOX_CIRCLE_ACTIVE
    : ICON_NAME.CHECKBOX_CIRCLE_INITIAL;

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
          <Icon iconName={checkBoxIcon} />
        </S.MenuOptionGroup>
      ))}
    </S.MenuList>
  );
};

export default Modal;
