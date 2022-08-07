import { RefObject, useEffect } from 'react';

import axios from 'axios';
import qs from 'qs';
import { useRecoilValue, useRecoilState } from 'recoil';

import { IconsType } from '@assets/icons';
import * as S from '@components/Modal/Modal.style';
import { POSITION } from '@components/Modal/constants';
import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import Image from '@components/common/Image';
import { IMAGE_SIZE } from '@components/common/Image/constants';
import { API } from '@constants';
import useCheckBox from '@hooks/useCheckBox';
import { queryClient } from '@src';
import { filterBarArrState, filterBarState } from '@store/filterBar';
import { DropdownType } from '@type/dropdownType';

export interface ModalPropsType {
  modalRef: RefObject<HTMLDivElement>;
  data?: DropdownType[];
  title: string;
  type: string;
  position?: string;
  handleModalClick: (event: MouseEvent) => void;
}

interface CheckedListType {
  id: number[];
  status: string;
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
  const { isCheckedItems, resetCheckedItems } = useCheckBox();

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
    for (const [, objValue] of filterBarArrValue) {
      if (Array.isArray(objValue)) {
        const checkSameValue = objValue.includes(value);
        if (type === 'is') {
          setFilterBarValue({ ...filterBarValue, [type]: ['issue', value] });
        } else if (type === 'stateModify') {
          fetchStateModify(value);
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

  const fetchStateModify = async (value: string) => {
    const accessToken = localStorage.getItem('accessToken')!;
    const checkedList = { id: Array.from(isCheckedItems), status: value };

    const myAxios = axios.create({
      paramsSerializer: (checkedList: CheckedListType) =>
        qs.stringify(checkedList, { arrayFormat: 'repeat' }),
    });

    await myAxios.post(`${API.STATUS_UPDATE()}`, null, {
      headers: {
        Authorization: `Bearer ${JSON.parse(accessToken)}`,
      },
      params: checkedList,
    });

    queryClient.invalidateQueries('issues');
    resetCheckedItems();
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
      {data &&
        data.map(({ optionName, value, imageUrl, colorCode }) => (
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
