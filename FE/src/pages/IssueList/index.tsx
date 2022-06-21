import Header from '@components/Header';
import IssueMenu from '@components/IssueMenu';
import IssueTable from '@components/IssueTable';
import * as S from '@pages/IssueList/IssueList.style';

const IssueList = () => {
  return (
    <S.Wrapper>
      <Header />
      <IssueMenu />
      <IssueTable />
    </S.Wrapper>
  );
};

export default IssueList;
