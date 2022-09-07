import Issue from '@components/IssueTable/Issue';
import * as S from '@components/IssueTable/IssueTable.style';
import TableHeader from '@components/IssueTable/TableHeader';
import Pagination from '@components/common/Pagination';
import useIssues from '@hooks/useIssues';
import { IssueType } from '@type/issueType';

const IssueTable = () => {
  const issues = useIssues();
  return (
    <>
      {issues && (
        <>
          <S.Wrapper>
            <TableHeader openedIssue={issues.openIssueCount} closedIssue={issues.closeIssueCount} />
            {!issues.issueCoverResponses.length && <S.NoIssue>등록된 이슈가 없습니다</S.NoIssue>}
            {issues.issueCoverResponses.map((issueInfo: IssueType) => (
              <Issue {...issueInfo} key={issueInfo.issueId} />
            ))}
          </S.Wrapper>
          <Pagination />
        </>
      )}
    </>
  );
};

export default IssueTable;
