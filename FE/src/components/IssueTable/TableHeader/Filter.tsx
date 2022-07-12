import { useRef, useState } from 'react';

import axios from 'axios';
import { useRecoilValue } from 'recoil';

import * as S from '@components/IssueTable/TableHeader/TableHeader.style';
import Modal from '@components/Modal';
import { POSITION } from '@components/Modal/constants';
import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import { API } from '@constants';
import { stateModify } from '@data/dropdownData';
import { useModal } from '@hooks/useModal';
import { modalState, ModalStateType } from '@store/dropdown';
import { DropdownType } from '@type/dropdownType';

interface FilterPropsType {
  type: ModalStateType;
  title: string;
}

const Filter = ({ type, title }: FilterPropsType) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [filterValue, setFilterValue] = useState<DropdownType[]>();
  const modalValue = useRecoilValue(modalState);
  const { toggleModal, handleModalClick } = useModal({ modalRef, type });

  const fetchTypeData = async () => {
    if (filterValue) return;
    if (type === 'stateModify') {
      setFilterValue(stateModify);
      return;
    }
    const accessToken = localStorage.getItem('accessToken')!;

    const response = await axios.get(`${API.FILTER(type)}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(accessToken)}`,
      },
    });

    setFilterValue([
      {
        optionName: `${title}이 없는 이슈`,
        value: 'none',
      },
      ...response.data[`${type}OutlineResponses`],
    ]);
  };

  return (
    <>
      <S.FilterButton onMouseEnter={fetchTypeData} onClick={toggleModal}>
        {title}
        <Icon iconName={ICON_NAME.SELECT} />
      </S.FilterButton>
      {modalValue[type] && (
        <Modal
          modalRef={modalRef}
          data={filterValue}
          title={title}
          position={POSITION.RIGHT}
          type={type}
          handleModalClick={handleModalClick}
        />
      )}
    </>
  );
};

export default Filter;
