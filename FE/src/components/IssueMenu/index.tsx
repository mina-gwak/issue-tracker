import { useRecoilValue } from 'recoil';

import FilterBar from '@components/IssueMenu/FilterBar';
import IssueAddButton from '@components/IssueMenu/IssueAddButton';
import * as S from '@components/IssueMenu/IssueMenu.style';
import Tabs from '@components/IssueMenu/Tabs';
import ResetFilterBarButton from '@components/ResetFilterBarButton';
import { defaultFilterBarState, filterBarState } from '@store/filterBar';

const IssueMenu = () => {
  const filterBarValue = useRecoilValue(filterBarState);

  const isShowResetButton =
    JSON.stringify(defaultFilterBarState) === JSON.stringify(filterBarValue);

  return (
    <>
      <S.Wrapper>
        <FilterBar />
        <S.Container>
          <Tabs />
          <IssueAddButton />
        </S.Container>
      </S.Wrapper>
      {!isShowResetButton && <ResetFilterBarButton />}
    </>
  );
};

export default IssueMenu;
