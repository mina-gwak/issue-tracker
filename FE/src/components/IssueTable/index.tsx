import Issue from '@components/IssueTable/Issue';
import * as S from '@components/IssueTable/IssueTable.style';
import TableHeader from '@components/IssueTable/TableHeader';
import { issueDummyData } from '@data';
import { IssueListType } from '@type/issueType';

const IssueTable = () => {
  return (
    <S.Wrapper>
      <TableHeader />
      {issueDummyData.map((issueInfo: IssueListType) => (
        <Issue {...issueInfo} key={issueInfo.id} />
      ))}
    </S.Wrapper>
  );
};

export default IssueTable;
