import * as S from '@components/IssueTable/Issue/Issue.style';
import IssueDescription from '@components/IssueTable/Issue/IssueDescription';
import IssueTitle from '@components/IssueTable/Issue/IssueTitle';
import CheckBox from '@components/common/CheckBox';
import Image from '@components/common/Image';
import { IMAGE_SIZE } from '@components/common/Image/constants';
import { IssueListType } from '@type/issueType';

const Issue = ({ title, labels, num, milestone, assignees, author, time }: IssueListType) => {
  return (
    <S.Wrapper>
      <CheckBox checkBoxId='1' isChecked={true} toggleIsChecked={() => {}} />
      <S.Container>
        <IssueTitle {...{ title }} {...{ labels }} />
        <IssueDescription
          {...{ num }}
          {...{ milestone }}
          {...{ assignees }}
          {...{ author }}
          {...{ time }}
        />
      </S.Container>
      <Image url={author.imgUrl} alt={author.name} size={IMAGE_SIZE.SMALL} />
    </S.Wrapper>
  );
};

export default Issue;
