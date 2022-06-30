import Issue from '@components/IssueTable/Issue';
import * as S from '@components/IssueTable/IssueTable.style';
import TableHeader from '@components/IssueTable/TableHeader';
import { useIssuesQuery } from '@query/issue';
import { IssueDataType, IssueType } from '@type/issueType';

const IssueTable = () => {
  const { data } = useIssuesQuery<IssueDataType>();

  return (
    <S.Wrapper>
      <TableHeader openedIssue={data?.openIssueCount} closedIssue={data?.closeIssueCount} />
      {(!data?.issueCoverResponses.length) && <S.NoIssue>등록된 이슈가 없습니다</S.NoIssue>}
      {data && data.issueCoverResponses.map((issueInfo: IssueType) => <Issue {...issueInfo} key={issueInfo.issueId} />)}
    </S.Wrapper>
  );
};

export default IssueTable;
