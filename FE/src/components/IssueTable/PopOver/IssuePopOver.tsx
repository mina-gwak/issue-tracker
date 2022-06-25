import * as S from '@components/IssueTable/PopOver/PopOver.style';
import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import Image from '@components/common/Image';
import { IMAGE_SIZE } from '@components/common/Image/constants';
import Label from '@components/common/Label';
import PopOver from '@components/common/PopOver';
import { IssueListType } from '@type/issueType';
import { getDate } from '@utils/date';

const MAX_LABEL = 3;
const USER = 'Jamie';

const IssuePopOver = ({ title, labels, num, assignees, author, isOpen, time }: IssueListType) => {
  const iconName = isOpen ? ICON_NAME.ALERT_CIRCLE : ICON_NAME.ARCHIVE;

  // TODO: 유저의 네임값 가져와서 비교
  const isAuthor = author.name === USER;
  const isAssignee = assignees.some(({ name }) => name === USER);

  const userDescription = () => {
    if (isAuthor && isAssignee) return 'You are assigned and opened';
    else if (isAuthor) return 'You are opened';
    else if (isAssignee) return 'You are assigned';
  };

  return (
    <PopOver>
      <S.Wrapper {...{ isOpen }}>
        <S.ContentsWrapper>
          <S.Date>{getDate(time)}</S.Date>
          <S.ContentsContainer>
            <Icon {...{ iconName }} />
            <div>
              <S.IssueLink to='이슈 상세 페이지'>
                <S.Title>{title}</S.Title>
                <S.IssueNumber>#{num}</S.IssueNumber>
              </S.IssueLink>
              <S.IssueContents>
                Hercle, victrix regius! gratis absolutio! rem Est bassus armarium, cesaris. Ecce, nixus! Nunquam fallere boreas.
              </S.IssueContents>
              <S.LabelList>
                {labels.map((label) => (
                  <li>
                    <Label {...label} />
                  </li>
                ))}
                {labels.length > MAX_LABEL && (
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
            <Image
              url={author.imgUrl}
              alt={author.name}
              size={IMAGE_SIZE.SMALL}
            />
            <S.UserDescription>{userDescription()}</S.UserDescription>
          </S.UserWrapper>
        )}
      </S.Wrapper>
    </PopOver>
  );
};

export default IssuePopOver;
