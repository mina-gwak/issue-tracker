import { useRecoilValue } from 'recoil';

import * as S from '@components/IssueTable/TableHeader/TableHeader.style';
import Modal from '@components/Modal';
import { POSITION } from '@components/Modal/constants';
import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import { labels, milestones, assignees, writers } from '@data/dropdownData';
import { useModal } from '@hooks/useModal';
import { modalState, ModalStateType } from '@store/dropdown';
import { DropdownType } from '@type/dropdownType';

interface FilterPropsType {
  type: ModalStateType;
  title: string;
}

const fetchData: { [key: string]: DropdownType[] } = {
  labels,
  milestones,
  assignees,
  writers,
};

const Filter = ({ type, title }: FilterPropsType) => {
  const modalValue = useRecoilValue(modalState);
  const { toggleModal } = useModal();
  const curData = fetchData[type];

  return (
    <>
      <S.FilterButton onClick={toggleModal(type)}>
        {title}
        <Icon iconName={ICON_NAME.SELECT} />
      </S.FilterButton>
      {modalValue[type] && (
        <Modal data={curData} title={title} position={POSITION.RIGHT} type={type} />
      )}
    </>
  );
};

export default Filter;
