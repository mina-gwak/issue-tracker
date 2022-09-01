import { useRecoilValue } from 'recoil';

import IssueMenu from '@components/IssueMenu';
import IssueTable from '@components/IssueTable';
import * as S from '@pages/IssueList/IssueList.style';
import Loading from '@pages/Loading';
import { useIssuesQuery } from '@query/issue';
import { filterBarQueryString } from '@store/filterBar';

const IssueList = () => {
  const filterBarValue = useRecoilValue(filterBarQueryString);
  const { isLoading } = useIssuesQuery(filterBarValue);

  if (isLoading) return <Loading />;

  return (
    <S.Wrapper>
      <IssueMenu />
      <IssueTable />
    </S.Wrapper>
  );
};

export default IssueList;
