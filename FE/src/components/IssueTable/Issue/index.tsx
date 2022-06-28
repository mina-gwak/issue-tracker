import * as S from '@components/IssueTable/Issue/Issue.style';
import IssueDescription from '@components/IssueTable/Issue/IssueDescription';
import IssueTitle from '@components/IssueTable/Issue/IssueTitle';
import CheckBox from '@components/common/CheckBox';
import Image from '@components/common/Image';
import { IMAGE_SIZE } from '@components/common/Image/constants';
import { IssueType } from '@type/issueType';

const Issue = ({
  title,
  labelCoverResponses,
  issueId,
  isOpen,
  writer,
  writerImage,
  modificationTime,
  milestoneName,
}: IssueType) => {
  return (
    <S.Wrapper>
      <CheckBox isChecked={true} toggleIsChecked={() => {}} />
      <S.Container>
        <IssueTitle issueId={issueId} isOpen={isOpen} {...{ title }} labels={labelCoverResponses} />
        <IssueDescription
          {...{ issueId }}
          {...{ milestoneName }}
          {...{ writer }}
          {...{ modificationTime }}
        />
      </S.Container>
      <Image url={writerImage} alt={writer} size={IMAGE_SIZE.SMALL} />
    </S.Wrapper>
  );
};

export default Issue;
