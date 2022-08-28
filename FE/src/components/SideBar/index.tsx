import { useRecoilValue } from 'recoil';

import * as S from '@components/SideBar/SideBar.style';
import SideBarSection from '@components/SideBar/SideBarSection';
import Image from '@components/common/Image';
import { IMAGE_SIZE } from '@components/common/Image/constants';
import Label from '@components/common/Label';
import ProgressBar from '@components/common/ProgressBar';
import { useSelectedLabelsQuery } from '@query/label';
import { useSelectedMilestoneQuery } from '@query/milestone';
import { useSelectedUsersQuery } from '@query/user';
import { issueOptionsState } from '@store/issueOptions';

const SideBar = () => {
  // TODO: 구조 개선 필요
  const issueOptions = useRecoilValue(issueOptionsState);

  const { data: assignees } = useSelectedUsersQuery(issueOptions.assignees);
  const { data: labels } = useSelectedLabelsQuery(issueOptions.labels);
  const { data: milestones } = useSelectedMilestoneQuery(issueOptions.milestone);

  return (
    <S.Wrapper>
      <SideBarSection title='담당자' type='assignees'>
        {assignees && assignees.length > 0 && (
          <S.List>
            {assignees.map(({ optionName, imageUrl }) => (
              <S.ListItem key={optionName}>
                <Image url={imageUrl} alt={optionName} size={IMAGE_SIZE.MEDIUM} />
                <S.Text>{optionName}</S.Text>
              </S.ListItem>
            ))}
          </S.List>
        )}
      </SideBarSection>
      <SideBarSection title='레이블' type='labels'>
        {labels && labels.length > 0 && (
          <S.List>
            {labels.map(({ name, colorCode, textColor }) => (
              <S.ListItem key={name}>
                <Label labelName={name} labelColor={colorCode} textColor={textColor} />
              </S.ListItem>
            ))}
          </S.List>
        )}
      </SideBarSection>
      <SideBarSection title='마일스톤' type='milestone'>
        {milestones &&
          milestones.map(({ name, ratio }) => (
            <div>
              <ProgressBar progress={ratio} />
              <S.Text>{name}</S.Text>
            </div>
          ))}
      </SideBarSection>
    </S.Wrapper>
  );
};

export default SideBar;
