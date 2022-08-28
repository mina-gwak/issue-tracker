import { useRef } from 'react';

import * as S from '@components/IssueTable/TableHeader/TableHeader.style';
import Modal from '@components/Modal';
import { POSITION } from '@components/Modal/constants';
import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import useFilterOptions from '@hooks/useFilterOptions';
import useFilterValue from '@hooks/useFilterValue';
import useModal from '@hooks/useModal';
import { ModalStateType } from '@store/dropdown';

interface FilterPropsType {
  type: ModalStateType;
  title: string;
}

const Filter = ({ type, title }: FilterPropsType) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const {filterValue, fetchFilterValue} = useFilterValue({ type, title });
  const [isModalOpen, toggleModal] = useModal({ modalRef });
  const { isChecked, checkBoxClickHandler } = useFilterOptions({ type });

  return (
    <>
      <S.FilterButton onMouseEnter={fetchFilterValue} onClick={toggleModal}>
        {title}
        <Icon iconName={ICON_NAME.SELECT} />
      </S.FilterButton>
      {isModalOpen && (
        <Modal
          modalRef={modalRef}
          data={filterValue}
          title={`${title} 필터`}
          position={POSITION.RIGHT}
          isChecked={isChecked}
          checkBoxClickHandler={checkBoxClickHandler}
        />
      )}
    </>
  );
};

export default Filter;
