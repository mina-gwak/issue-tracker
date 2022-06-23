import Issue from '@components/IssueTable/Issue';
import * as S from '@components/IssueTable/IssueTable.style';
import TableHeader from '@components/IssueTable/TableHeader';
import { API } from '@constants';
import { issueDummyData } from '@data';
import useAxios from '@hooks/useAxios';
import { IssueListType } from '@type/issueType';

const IssueTable = () => {

  const [{ response, isLoading, error }] = useAxios<IssueListType[]>({
    method: 'get',
    url: API.ISSUE,
  });

  console.log(isLoading, response, error);

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
