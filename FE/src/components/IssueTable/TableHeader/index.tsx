import { useRecoilState, useRecoilValue } from 'recoil';

import Filter from '@components/IssueTable/TableHeader/Filter';
import * as S from '@components/IssueTable/TableHeader/TableHeader.style';
import CheckBox from '@components/common/CheckBox';
import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import { filterList } from '@data';
import useCheckBox from '@hooks/useCheckBox';
import { filterBarArrState, filterBarState } from '@store/filterBar';

export interface TableHeaderPropsType {
  openedIssue: number | undefined;
  closedIssue: number | undefined;
}

const TableHeader = ({ openedIssue = 0, closedIssue = 0 }: TableHeaderPropsType) => {
  const filterBarArrValue = useRecoilValue(filterBarArrState);
  const [filterBarValue, setFilterBarValue] = useRecoilState(filterBarState);
  const { isCheckedItems, isAllChecked, toggleIsAllChecked } = useCheckBox();
  const isChecked = isCheckedItems.size > 0;

  const issueTabClickHandler = (value: string) => () => {
    for (const [, objValue] of filterBarArrValue) {
      if (Array.isArray(objValue)) {
        const checkSameValue = objValue.includes(value);
        if (checkSameValue) return;
        if (!checkSameValue) {
          setFilterBarValue({ ...filterBarValue, is: ['issue', value] });
        }
      }
    }
  };

  return (
    <S.Wrapper>
      <CheckBox
        isChecked={isChecked}
        toggleIsChecked={toggleIsAllChecked}
        isAllChecked={isAllChecked}
      />
      {isChecked ? (
        <>
          <S.IssueTabs>
            <li>
              <S.IssueTab>{isCheckedItems.size}개 이슈 선택</S.IssueTab>
            </li>
          </S.IssueTabs>
          <S.FilterList>
            <S.FilterListItem>
              <Filter type='stateModify' title='상태 수정' />
            </S.FilterListItem>
          </S.FilterList>
        </>
      ) : (
        <>
          <S.IssueTabs>
            <li>
              <S.IssueTab onClick={issueTabClickHandler('open')} isActive={filterBarValue.is.includes('open')}>
                <Icon iconName={ICON_NAME.ALERT_CIRCLE} />
                열린 이슈({openedIssue})
              </S.IssueTab>
            </li>
            <li>
              <S.IssueTab onClick={issueTabClickHandler('close')} isActive={filterBarValue.is.includes('close')}>
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
        </>
      )}
    </S.Wrapper>
  );
};

export default TableHeader;
