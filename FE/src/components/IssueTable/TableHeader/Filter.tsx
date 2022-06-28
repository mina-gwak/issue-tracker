import { useRecoilValue } from 'recoil';

import * as S from '@components/IssueTable/TableHeader/TableHeader.style';
import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import Modal from '@components/common/Modal';
import { POSITION } from '@components/common/Modal/constants';
import { assignee } from '@data/dropdownData';
import { useModal } from '@hooks/useModal';
import { modalState, ModalStateType } from '@store/atom/dropdown';

interface FilterPropsType {
  type: ModalStateType;
  title: string;
}

const Filter = ({ type, title }: FilterPropsType) => {
  // TODO: type 값을 활용한 data fetching
  const modalValue = useRecoilValue(modalState);

  const { toggleModal } = useModal();

  return (
    <>
      <S.FilterButton onClick={toggleModal(type)}>
        {title}
        <Icon iconName={ICON_NAME.SELECT} />
      </S.FilterButton>
      {modalValue[type] && <Modal data={assignee} title={title} position={POSITION.RIGHT} />}
    </>
  );
};

export default Filter;
