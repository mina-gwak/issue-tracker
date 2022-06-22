import { useState } from 'react';

import Filter from '@components/IssueTable/TableHeader/Filter';
import * as S from '@components/IssueTable/TableHeader/TableHeader.style';
import CheckBox from '@components/common/CheckBox';
import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import { filterList } from '@data';

const TableHeader = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isAllChecked, setIsAllChecked] = useState(false);

  // TODO: 데이터 요청 후 각각 열림/닫힘 이슈의 개수로 업데이트
  const openedIssue = 2;
  const closedIssue = 0;

  const toggleIsChecked = () => setIsChecked((isChecked) => !isChecked);

  return (
    <S.Wrapper>
      <CheckBox
        checkBoxId='check-all'
        {...{ isChecked }}
        {...{ toggleIsChecked }}
        {...{ isAllChecked }}
      />
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
