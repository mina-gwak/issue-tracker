import { useState } from 'react';

import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Button from '@components/common/Button';
import { BUTTON_SIZE } from '@components/common/Button/constants';
import Textarea from '@components/common/Textarea';
import { detailIssueTrigger } from '@store/detailIssue';
import { editComments } from '@utils/api/fetchComment';

const EditComment = ({ commentId, content, handelCancelClick }: any) => {
  const setDetailIssueTrigger = useSetRecoilState(detailIssueTrigger);

  const [editComment, setEditComment] = useState('');

  const handleSubmitClick = async () => {
    if (editComment === content) return handelCancelClick();

    const editCommentResult = await editComments(commentId, editComment);
    if (editCommentResult) {
      setDetailIssueTrigger((prev) => prev + 1);
      handelCancelClick();
    }
  };
  return (
    <EditCommentBlock>
      <Textarea comment={editComment} setComment={setEditComment} />
      <ButtonContainer>
        <Button size={BUTTON_SIZE.SMALL} onClick={handelCancelClick}>
          <span> 편집 취소</span>
        </Button>

        <Button size={BUTTON_SIZE.SMALL} onClick={handleSubmitClick}>
          <span> 편집 완료</span>
        </Button>
      </ButtonContainer>
    </EditCommentBlock>
  );
};

const EditCommentBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-right: 1rem;
`;

export default EditComment;
