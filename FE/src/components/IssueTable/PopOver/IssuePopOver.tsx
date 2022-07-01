import * as S from '@components/IssueTable/PopOver/PopOver.style';
import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import Image from '@components/common/Image';
import { IMAGE_SIZE } from '@components/common/Image/constants';
import Label from '@components/common/Label';
import { API } from '@constants';
import useAxios from '@hooks/useAxios';
import { useIssue } from '@query/issue';
import { IssuePopOverDataType, IssueType } from '@type/issueType';
import { getDate } from '@utils/date';

const MAX_LABEL = 3;
const USER = 'jamie';

export interface IssuePopOverPropsType {
  issueId: number;
}

const IssuePopOver = ({ issueId }: IssuePopOverPropsType) => {
  const { data: { opened, title, writer, writerImage, labelCoverResponses } = {} as IssueType } =
    useIssue(issueId);

  const [{ response = null }] = useAxios<IssuePopOverDataType>({
    method: 'get',
    url: API.ISSUE_POPOVER(issueId),
  });

  const iconName = opened ? ICON_NAME.ALERT_CIRCLE : ICON_NAME.ARCHIVE;

  // TODO: 유저의 네임값 가져와서 비교
  const isAuthor = writer === USER;
  const isAssignee = response?.assignedMe;

  const userDescription = () => {
    if (isAuthor && isAssignee) return 'You are assigned and opened';
    else if (isAuthor) return 'You are opened';
    else if (isAssignee) return 'You are assigned';
  };

  return (
    response && (
      <S.Wrapper>
        <S.Container isOpened={opened}>
          <S.ContentsWrapper>
            <S.Date>{getDate(response.writtenTime)}</S.Date>
            <S.ContentsContainer>
              <Icon iconName={iconName} />
              <div>
                <S.IssueLink to='이슈 상세 페이지'>
                  <S.Title>{title}</S.Title>
                  <S.IssueNumber>#{issueId}</S.IssueNumber>
                </S.IssueLink>
                <S.IssueContents>{response.content}</S.IssueContents>
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
    )
  );
};

export default IssuePopOver;
