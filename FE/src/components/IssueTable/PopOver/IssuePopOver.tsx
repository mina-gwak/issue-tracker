import * as S from '@components/IssueTable/PopOver/PopOver.style';
import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import Image from '@components/common/Image';
import { IMAGE_SIZE } from '@components/common/Image/constants';
import Label from '@components/common/Label';
import { useIssue } from '@query/issue';
import { useIssuePopOver } from '@query/issuePopOver';
import { IssuePopOverDataType, IssueType } from '@type/issueType';
import { getDate } from '@utils/date';

const MAX_LABEL = 3;
const USER = 'Jamie';

export interface IssuePopOverPropsType {
  issueId: number;
}

const IssuePopOver = ({ issueId }: IssuePopOverPropsType) => {
  const { data: { isOpen, title, writer, writerImage, labelCoverResponses } = {} as IssueType } =
    useIssue(issueId);

  const { data: { contents, registerTime, assignees } = {} as IssuePopOverDataType } =
    useIssuePopOver();

  const iconName = isOpen ? ICON_NAME.ALERT_CIRCLE : ICON_NAME.ARCHIVE;

  // TODO: 유저의 네임값 가져와서 비교
  const isAuthor = writer === USER;
  const isAssignee = assignees?.some(({ name }) => name === USER);

  const userDescription = () => {
    if (isAuthor && isAssignee) return 'You are assigned and opened';
    else if (isAuthor) return 'You are opened';
    else if (isAssignee) return 'You are assigned';
  };

  return (
    <S.Wrapper>
      <S.Container isOpen={isOpen}>
        <S.ContentsWrapper>
          <S.Date>{getDate(registerTime)}</S.Date>
          <S.ContentsContainer>
            <Icon iconName={iconName} />
            <div>
              <S.IssueLink to='이슈 상세 페이지'>
                <S.Title>{title}</S.Title>
                <S.IssueNumber>#{issueId}</S.IssueNumber>
              </S.IssueLink>
              <S.IssueContents>{contents}</S.IssueContents>
              <S.LabelList>
                {labelCoverResponses.map((label) => (
                  <li key={label.labelName}>
                    <Label {...label} />
                  </li>
                ))}
                {labelCoverResponses.length > MAX_LABEL && (
                  <li>
                    <S.MoreLabel>+ more</S.MoreLabel>
                  </li>
                )}
              </S.LabelList>
            </div>
          </S.ContentsContainer>
        </S.ContentsWrapper>
        {(isAuthor || isAssignee) && (
          <S.UserWrapper>
            <Image url={writerImage} alt={writer} size={IMAGE_SIZE.SMALL} />
            <S.UserDescription>{userDescription()}</S.UserDescription>
          </S.UserWrapper>
        )}
      </S.Container>
    </S.Wrapper>
  );
};

export default IssuePopOver;
