import { useState } from 'react';

import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Button from '@components/common/Button';
import { BUTTON_SIZE } from '@components/common/Button/constants';
import Icon from '@components/common/Icon';
import { ICON_NAME, ICON_SIZE } from '@components/common/Icon/constants';
import Textarea from '@components/common/Textarea';
import { detailIssueTrigger } from '@store/detailIssue';
import { editComments } from '@utils/api/fetchComment';

const EditComment = ({ commentId, content, handelCancelClick }: any) => {
  const [editContent, setEditContent] = useState(content);

  const setDetailIssueTrigger = useSetRecoilState(detailIssueTrigger);

  const isSubmitDisabled = editContent === content;

  const handleSubmitClick = async () => {
    const editCommentResult = await editComments(commentId, editContent);
    if (editCommentResult) {
      setDetailIssueTrigger((prev) => prev + 1);
      handelCancelClick();
    }
  };
  return (
    <EditCommentBlock>
      <Textarea content={editContent} setContent={setEditContent} />
      <ButtonContainer>
        <Button size={BUTTON_SIZE.SMALL} onClick={handelCancelClick} outline={true}>
          <Icon iconName={ICON_NAME.X_SQUARE} iconSize={ICON_SIZE.SMALL} />
          <span> 편집 취소</span>
        </Button>

        <Button size={BUTTON_SIZE.SMALL} onClick={handleSubmitClick} disabled={isSubmitDisabled}>
          <Icon iconName={ICON_NAME.EDIT_ICON} iconSize={ICON_SIZE.SMALL} />
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
`;

export default EditComment;
