import { ReactNode, useEffect, useRef, useState } from 'react';

import Modal from '@components/Modal';
import { POSITION } from '@components/Modal/constants';
import * as S from '@components/SideBar/SideBarSection/SideBarSection.style';
import Icon from '@components/common/Icon';
import { ICON_NAME, ICON_SIZE } from '@components/common/Icon/constants';
import useIssueOptions from '@hooks/useIssueOptions';
import useModal from '@hooks/useModal';
import { useLabelsQuery } from '@query/label';
import { useMilestonesQuery } from '@query/milestone';
import { useUsersQuery } from '@query/user';
import { DropdownType } from '@type/dropdownType';

interface SideBarSectionPropsType {
  title: '담당자' | '레이블' | '마일스톤';
  type: 'assignees' | 'labels' | 'milestone';
  children?: ReactNode;
}

const SideBarSection = ({ title, children, type }: SideBarSectionPropsType) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [modalData, setModalData] = useState<DropdownType[]>();
  const [trigger, setTrigger] = useState<string>('');

  const [isModalOpen, toggleModal] = useModal({ modalRef });
  const { isChecked, checkBoxClickHandler } = useIssueOptions({ type });

  const { data: assignees } = useUsersQuery(trigger);
  const { data: labels } = useLabelsQuery(trigger);
  const { data: milestones } = useMilestonesQuery(trigger);

  useEffect(() => {
    if (type === 'assignees') assignees && setModalData(assignees);
    else if (type === 'labels')
      labels &&
        setModalData(labels.map(({ name, colorCode }) => ({ optionName: name, colorCode })));
    else if (type === 'milestone')
      milestones && setModalData(milestones.map(({ name }) => ({ optionName: name })));
  }, [assignees, labels, milestones]);

  return (
    <S.Container>
      <S.AddButton type='button' onMouseEnter={() => setTrigger(type)} onClick={toggleModal}>
        <S.Title>{title}</S.Title>
        <Icon iconName={ICON_NAME.ADD} iconSize={ICON_SIZE.SMALL} />
      </S.AddButton>
      {children}
      {isModalOpen && (
        <Modal
          modalRef={modalRef}
          data={modalData}
          title={`${title} 추가`}
          position={POSITION.LEFT}
          isChecked={isChecked}
          checkBoxClickHandler={checkBoxClickHandler}
        />
      )}
    </S.Container>
  );
};

export default SideBarSection;
