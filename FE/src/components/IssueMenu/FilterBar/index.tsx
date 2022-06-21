import * as S from '@components/IssueMenu/FilterBar/FilterBar.style';
import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';

const FilterBar = () => {
  return (
    <S.Wrapper>
      <S.FilterButtonWrapper>
        <S.FilterButton>
          필터
          <Icon iconName={ICON_NAME.SELECT} />
        </S.FilterButton>
        {/* 필터 드롭다운 */}
      </S.FilterButtonWrapper>
      <S.FilterInputWrapper>
        <S.FilterInput type='text' placeholder='Search all issues' />
        <Icon iconName={ICON_NAME.SEARCH} />
      </S.FilterInputWrapper>
    </S.Wrapper>
  );
};

export default FilterBar;
