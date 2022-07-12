import { useState } from 'react';

import * as S from '@components/IssueTable/Issue/Issue.style';
import AuthorPopOver from '@components/IssueTable/PopOver/AuthorPopOver';
import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import { calcTwoTimeDifference } from '@utils/date';

interface IssueDescriptionPropsType {
  issueId: number;
  milestoneName: string;
  writer: string;
  modificationTime: string;
}

const IssueDescription = ({
  issueId,
  milestoneName,
  writer,
  modificationTime,
}: IssueDescriptionPropsType) => {
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);

  const currentDate = new Date();
  const differenceTime = calcTwoTimeDifference(currentDate, modificationTime);

  return (
    <S.Description>
      <S.Text>{`#${issueId}`}</S.Text>
      <S.TimeStamp>
        <S.Text>{`이 이슈가 ${differenceTime}, `}</S.Text>
        <S.AuthorPopOverWrapper
          onMouseEnter={() => setIsPopOverOpen(true)}
          onMouseLeave={() => setIsPopOverOpen(false)}
        >
          {writer}
          {isPopOverOpen && <AuthorPopOver />}
        </S.AuthorPopOverWrapper>
        <S.Text>님에 의해 작성되었습니다</S.Text>
      </S.TimeStamp>
      <S.Milestone to='../milestone'>
        <Icon iconName={ICON_NAME.MILESTONE} />
        <S.Text>{milestoneName}</S.Text>
      </S.Milestone>
    </S.Description>
  );
};

export default IssueDescription;
