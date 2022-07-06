import { RefObject, useEffect } from 'react';

import { useRecoilValue, useRecoilState } from 'recoil';

import { IconsType } from '@assets/icons';
import * as S from '@components/Modal/Modal.style';
import { POSITION } from '@components/Modal/constants';
import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import Image from '@components/common/Image';
import { IMAGE_SIZE } from '@components/common/Image/constants';
import { filterBarArrState, filterBarState } from '@store/filterBar';
import { DropdownType } from '@type/dropdownType';

export interface ModalPropsType {
  modalRef: RefObject<HTMLDivElement>;
  data: DropdownType[];
  title: string;
  type: string;
  position?: string;
  handleModalClick: (event: MouseEvent) => void;
}

type isCheckedType = {
  (value?: string, optionName?: string): IconsType;
};

type checkBoxClickHandlerType = {
  (value?: string, optionName?: string): () => void;
};

const Modal = ({
  modalRef,
  data,
  title,
  type,
  position = POSITION.LEFT,
  handleModalClick,
}: ModalPropsType) => {
  const filterBarArrValue = useRecoilValue(filterBarArrState);
  const [filterBarValue, setFilterBarValue] = useRecoilState(filterBarState);

  const isChecked: isCheckedType = (value) => {
    let checkBoxIcon: IconsType = ICON_NAME.CHECKBOX_CIRCLE_INITIAL;

    if (!value) return checkBoxIcon;

    for (const [objKey, objValue] of filterBarArrValue) {
      if (Array.isArray(objValue)) {
        if (objKey === type) {
          objValue.forEach((item: string) => {
            if (item === value) checkBoxIcon = ICON_NAME.CHECKBOX_CIRCLE_ACTIVE;
          });
        }
      }
    }
    return checkBoxIcon;
  };

  const checkBoxClickHandler: checkBoxClickHandlerType = (value) => () => {
    if (!value) return;
    for (const [objKey, objValue] of filterBarArrValue) {
      if (Array.isArray(objValue)) {
        const checkSameValue = objValue.includes(value);
        if (type === 'is') {
          setFilterBarValue({ ...filterBarValue, [type]: ['issue', value] });
        } else {
          if (!checkSameValue) {
            setFilterBarValue({ ...filterBarValue, [type]: [value] });
          }
          if (checkSameValue) {
            setFilterBarValue({ ...filterBarValue, [type]: [] });
          }
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleModalClick, true);

    return () => {
      document.removeEventListener('click', handleModalClick, true);
    };
  }, [modalRef]);

  return (
    <S.MenuList position={position} ref={modalRef}>
      <S.MenuTitle>{title} 필터</S.MenuTitle>
      {data.map(({ optionName, value, imageUrl, colorCode }) => (
        <S.MenuOptionGroup key={optionName}>
          <S.MenuOptionItem>
            {imageUrl && <Image url={imageUrl} alt={optionName} size={IMAGE_SIZE.SMALL} />}
            {colorCode && <S.CircleColorIcon colorIcon={colorCode} />}
            <S.MenuItemOption>{optionName}</S.MenuItemOption>
          </S.MenuOptionItem>
          <button onClick={checkBoxClickHandler(value || optionName)}>
            <Icon iconName={isChecked(value || optionName)} />
          </button>
        </S.MenuOptionGroup>
      ))}
    </S.MenuList>
  );
};

export default Modal;
