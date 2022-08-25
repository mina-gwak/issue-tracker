import AddIssueForm from '@components/AddIssueForm';
import * as S from '@pages/AddIssue/AddIssue.style';

const AddIssue = () => {

  return (
    <S.Wrapper>
      <S.PageTitle>새로운 이슈 작성</S.PageTitle>
      <S.Divider />
      <AddIssueForm />
    </S.Wrapper>
  );
};

export default AddIssue;
