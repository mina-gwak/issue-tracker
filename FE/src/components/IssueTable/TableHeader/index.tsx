import Filter from '@components/IssueTable/TableHeader/Filter';
import * as S from '@components/IssueTable/TableHeader/TableHeader.style';
import CheckBox from '@components/common/CheckBox';
import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import { filterList } from '@data';
import useCheckBox from '@hooks/useCheckBox';

export interface TableHeaderPropsType {
  count: [number, number];
}

const TableHeader = ({ count: [openedIssue, closedIssue] }: TableHeaderPropsType) => {
  const { isCheckedItems, isAllChecked, toggleIsAllChecked } = useCheckBox();
  const isChecked = isCheckedItems.size > 0;

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
        </>
      )}
    </S.Wrapper>
  );
};

export default TableHeader;
