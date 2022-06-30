import * as S from '@components/IssueTable/Issue/Issue.style';
import IssueDescription from '@components/IssueTable/Issue/IssueDescription';
import IssueTitle from '@components/IssueTable/Issue/IssueTitle';
import CheckBox from '@components/common/CheckBox';
import Image from '@components/common/Image';
import { IMAGE_SIZE } from '@components/common/Image/constants';
import useCheckBox from '@hooks/useCheckBox';
import { IssueType } from '@type/issueType';

const Issue = ({
  title,
  labelCoverResponses,
  issueId,
  opened,
  writer,
  writerImage,
  modificationTime,
  milestoneName,
}: IssueType) => {
  const { getIsChecked, toggleCheckItem } = useCheckBox();

  const isChecked = getIsChecked(issueId);

  return (
    <S.Wrapper>
      <CheckBox isChecked={isChecked} toggleIsChecked={() => toggleCheckItem(issueId)} />
      <S.Container>
        <IssueTitle issueId={issueId} isOpened={opened} title={title} labels={labelCoverResponses} />
        <IssueDescription
          issueId={issueId}
          milestoneName={milestoneName}
          writer={writer}
          modificationTime={modificationTime}
        />
      </S.Container>
      <Image url={writerImage} alt={writer} size={IMAGE_SIZE.SMALL} />
    </S.Wrapper>
  );
};

export default Issue;
