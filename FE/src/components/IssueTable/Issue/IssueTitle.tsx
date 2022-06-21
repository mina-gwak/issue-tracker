import { Link } from 'react-router-dom';

import * as S from '@components/IssueTable/Issue/Issue.style';
import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import Label from '@components/common/Label';
import { LabelType } from '@type/issueType';

interface IssueTitlePropsType {
  title: string;
  labels: LabelType[];
}

const IssueTitle = ({ title, labels }: IssueTitlePropsType) => {
  return (
    <S.IssueTitleWrapper>
      <Icon iconName={ICON_NAME.ALERT_CIRCLE} />
      <Link to={`이슈 상세 페이지`}>
        <S.Title>{title}</S.Title>
      </Link>
      {labels.length && labels.map(({ id, ...props }: LabelType) => <Label {...props} key={id} />)}
    </S.IssueTitleWrapper>
  );
};

export default IssueTitle;
