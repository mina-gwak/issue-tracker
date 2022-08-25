import { RefObject } from 'react';

import * as S from '@components/Modal/Modal.style';
import { POSITION } from '@components/Modal/constants';
import Icon from '@components/common/Icon';
import Image from '@components/common/Image';
import { IMAGE_SIZE } from '@components/common/Image/constants';
import { ModalStateType } from '@store/dropdown';
import { DropdownType } from '@type/dropdownType';
import { checkBoxClickHandlerType, isCheckedType } from '@type/useOption';

export type FilterType = ModalStateType | 'is';

export interface ModalPropsType {
  modalRef: RefObject<HTMLDivElement>;
  data?: DropdownType[];
  title: string;
  position?: string;
  isChecked: isCheckedType;
  checkBoxClickHandler: checkBoxClickHandlerType;
}

const Modal = ({
  modalRef,
  data,
  title,
  position = POSITION.LEFT,
  isChecked,
  checkBoxClickHandler,
}: ModalPropsType) => {
  return (
    <S.MenuList position={position} ref={modalRef}>
      <S.MenuTitle>{title}</S.MenuTitle>
      <S.MenuOptionList>
        {data &&
        data.map(({ optionName, value, imageUrl, colorCode }) => (
          <S.MenuOptionGroup key={optionName}>
            <S.MenuOptionItem>
              {imageUrl && <Image url={imageUrl} alt={optionName} size={IMAGE_SIZE.SMALL} />}
              {colorCode && <S.CircleColorIcon colorIcon={colorCode} />}
              <S.MenuItemOption>{optionName}</S.MenuItemOption>
            </S.MenuOptionItem>
            <button type='button' onClick={checkBoxClickHandler(value || optionName)}>
              <Icon iconName={isChecked(value || optionName)} />
            </button>
          </S.MenuOptionGroup>
        ))}
      </S.MenuOptionList>
    </S.MenuList>
  );
};

export default Modal;
