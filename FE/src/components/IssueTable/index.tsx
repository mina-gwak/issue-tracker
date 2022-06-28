import Issue from '@components/IssueTable/Issue';
import * as S from '@components/IssueTable/IssueTable.style';
import TableHeader from '@components/IssueTable/TableHeader';
import { useIssues } from '@query/issue';
import { IssueType } from '@type/issueType';

const IssueTable = () => {
  const { data } = useIssues();

  const count: [number, number] = data?.reduce((count, issue) => {
    issue.isOpen ? count[0]++ : count[1]++;
    return count;
  }, [0, 0]) || [0, 0];

  return (
    <S.Wrapper>
      <TableHeader count={count} />
      {data && data.map((issueInfo: IssueType) => <Issue {...issueInfo} key={issueInfo.issueId} />)}
    </S.Wrapper>
  );
};

export default IssueTable;
