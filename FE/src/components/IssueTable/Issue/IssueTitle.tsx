import { useState } from 'react';

import { Link } from 'react-router-dom';

import * as S from '@components/IssueTable/Issue/Issue.style';
import IssuePopOver from '@components/IssueTable/PopOver/IssuePopOver';
import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import Label from '@components/common/Label';
import { LabelType } from '@type/issueType';

interface IssueTitlePropsType {
  issueId: number;
  isOpened: boolean;
  title: string;
  labels: LabelType[];
}

const IssueTitle = ({ issueId, isOpened, title, labels }: IssueTitlePropsType) => {
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);

  const iconName = isOpened ? ICON_NAME.ALERT_CIRCLE : ICON_NAME.ARCHIVE;

  return (
    <S.IssueTitleWrapper isOpened={isOpened}>
      <Icon iconName={iconName} />
      <S.IssuePopOverWrapper
        onMouseEnter={() => setIsPopOverOpen(true)}
        onMouseLeave={() => setIsPopOverOpen(false)}
      >
        <Link to={`이슈 상세 페이지`}>
          <S.Title>{title}</S.Title>
        </Link>
        {isPopOverOpen && <IssuePopOver issueId={issueId} />}
      </S.IssuePopOverWrapper>
      <S.LabelList>
        {labels.length > 0 &&
          labels.map((label: LabelType) => <Label {...label} key={label.labelName} />)}
      </S.LabelList>
    </S.IssueTitleWrapper>
  );
};

export default IssueTitle;
