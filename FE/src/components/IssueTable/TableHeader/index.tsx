import { useState } from 'react';

import Filter from '@components/IssueTable/TableHeader/Filter';
import * as S from '@components/IssueTable/TableHeader/TableHeader.style';
import CheckBox from '@components/common/CheckBox';
import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import { filterList } from '@data';

export interface TableHeaderPropsType {
  count: [number, number];
}

const TableHeader = ({ count: [openedIssue, closedIssue] }: TableHeaderPropsType) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const toggleIsChecked = () => setIsChecked((prevState) => !prevState);

  return (
    <S.Wrapper>
      <CheckBox isChecked={isChecked} toggleIsChecked={toggleIsChecked} isAllChecked={isAllChecked} />
      <S.IssueTabs>
        <li>
          <S.IssueTab>
            <Icon iconName={ICON_NAME.ALERT_CIRCLE} />
            열린 이슈({openedIssue})
          </S.IssueTab>
        </li>
        <li>
          <S.IssueTab>
            <Icon iconName={ICON_NAME.ARCHIVE} />
            닫힌 이슈({closedIssue})
          </S.IssueTab>
        </li>
      </S.IssueTabs>
      <S.FilterList>
        {filterList.map(({ id, ...props }) => (
          <S.FilterListItem key={id}>
            <Filter {...props} />
          </S.FilterListItem>
        ))}
      </S.FilterList>
    </S.Wrapper>
  );
};

export default TableHeader;
