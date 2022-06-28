import * as S from '@components/IssueTable/Issue/Issue.style';
import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import { MilestoneType, MemberType } from '@type/issueType';
import { calcTwoTimeDifference } from '@utils/date';
interface IssueDescriptionPropsType {
  num: number;
  milestone: MilestoneType;
  author: MemberType;
  time: Date;
}

const IssueDescription = ({ num, milestone, author, time }: IssueDescriptionPropsType) => {
  const differenceTime = calcTwoTimeDifference(time);

  return (
    <S.Description>
      <S.Text>{`#${num}`}</S.Text>
      <S.Text as='p'>{`이 이슈가 ${differenceTime}, ${author.name}님에 의해 작성되었습니다`}</S.Text>
      <S.Milestone>
        <Icon iconName={ICON_NAME.MILESTONE} />
        <S.Text>{milestone.title}</S.Text>
      </S.Milestone>
    </S.Description>
  );
};

export default IssueDescription;
