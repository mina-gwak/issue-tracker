import FilterBar from '@components/IssueMenu/FilterBar';
import IssueAddButton from '@components/IssueMenu/IssueAddButton';
import * as S from '@components/IssueMenu/IssueMenu.style';
import Tabs from '@components/IssueMenu/Tabs';

const IssueMenu = () => {
  return (
    <S.Wrapper>
      <FilterBar />
      <S.Container>
        <Tabs />
        <IssueAddButton />
      </S.Container>
    </S.Wrapper>
  );
};

export default IssueMenu;
