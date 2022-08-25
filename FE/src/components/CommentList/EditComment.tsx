import { useState } from 'react';

import styled from 'styled-components';

import Button from '@components/common/Button';
import { BUTTON_SIZE } from '@components/common/Button/constants';
import Textarea from '@components/common/Textarea';

const EditComment = ({ issueId, content, handelCancelClick }: any) => {
  const [comment, setComment] = useState('');

  const handleSubmitClick = async () => {};
  return (
    <EditCommentBlock>
      <Textarea comment={comment} setComment={setComment} />
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
