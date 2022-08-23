import { useRef } from 'react';

import { useRecoilValue } from 'recoil';

import * as S from '@components/IssueTable/TableHeader/TableHeader.style';
import Modal from '@components/Modal';
import { POSITION } from '@components/Modal/constants';
import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import useFilterValue from '@hooks/useFilterValue';
import { useModal } from '@hooks/useModal';
import { modalState, ModalStateType } from '@store/dropdown';

interface FilterPropsType {
  type: ModalStateType;
  title: string;
}

const Filter = ({ type, title }: FilterPropsType) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const {filterValue, fetchFilterValue} = useFilterValue({ type, title });
  const modalValue = useRecoilValue(modalState);
  const { toggleModal, handleModalClick } = useModal({ modalRef, type });

  return (
    <>
      <S.FilterButton onMouseEnter={fetchFilterValue} onClick={toggleModal}>
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
