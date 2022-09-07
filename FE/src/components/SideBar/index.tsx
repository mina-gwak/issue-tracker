import * as S from '@components/SideBar/SideBar.style';
import SideBarSection from '@components/SideBar/SideBarSection';
import Image from '@components/common/Image';
import { IMAGE_SIZE } from '@components/common/Image/constants';
import Label from '@components/common/Label';
import ProgressBar from '@components/common/ProgressBar';
import { useSideBarQuery } from '@query/sidebar';
import { WriterType } from '@type/detailIssueType';
import { LabelTabType } from '@type/label';
import { MilestoneTabType } from '@type/milestone';

interface SideBarPropsType {
  issueId?: number;
  editable?: boolean;
}

const SideBar = ({ issueId, editable }: SideBarPropsType) => {
  // TODO: 구조 개선 필요
  const [assignees, labels, milestones] = useSideBarQuery();

  return (
    <S.Wrapper>
      <SideBarSection title='담당자' type='assignees' issueId={issueId} editable={editable}>
        {assignees && assignees.length > 0 && (
          <S.List>
            {assignees.map(({ optionName, imageUrl }: WriterType) => (
              <S.ListItem key={optionName}>
                <Image url={imageUrl} alt={optionName} size={IMAGE_SIZE.MEDIUM} />
                <S.Text>{optionName}</S.Text>
              </S.ListItem>
            ))}
          </S.List>
        )}
      </SideBarSection>
      <SideBarSection title='레이블' type='labels' issueId={issueId} editable={editable}>
        {labels && labels.length > 0 && (
          <S.List>
            {labels.map(({ name, colorCode, textColor }: LabelTabType) => (
              <S.ListItem key={name}>
                <Label labelName={name} labelColor={colorCode} textColor={textColor} />
              </S.ListItem>
            ))}
          </S.List>
        )}
      </SideBarSection>
      <SideBarSection title='마일스톤' type='milestone' issueId={issueId} editable={editable}>
        {milestones &&
          milestones.map(({ name, ratio }: MilestoneTabType) => (
            <div key={name}>
              <ProgressBar progress={+ratio} />
              <S.Text>{name}</S.Text>
            </div>
          ))}
      </SideBarSection>
    </S.Wrapper>
  );
};

export default SideBar;
