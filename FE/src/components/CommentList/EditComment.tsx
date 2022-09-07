import { useState } from 'react';

import * as S from '@components/CommentList/CommentList.style';
import Button from '@components/common/Button';
import { BUTTON_SIZE } from '@components/common/Button/constants';
import Icon from '@components/common/Icon';
import { ICON_NAME, ICON_SIZE } from '@components/common/Icon/constants';
import Textarea from '@components/common/Textarea';
import { editIssueContent } from '@query/issue';
import { queryClient } from '@src';
import { editComments } from '@utils/api/fetchComment';

interface EditCommentPropsType {
  issueId?: number;
  commentId: number;
  content: string;
  handleCancleClick: () => void;
}

const EditComment = ({ issueId, commentId, content, handleCancleClick }: EditCommentPropsType) => {
  const [editContent, setEditContent] = useState(content);

  const isSubmitDisabled = editContent === content;

  const handleSubmitClick = async () => {
    let result;
    if (issueId) result = await editIssueContent(issueId, editContent);
    else result = await editComments(commentId, editContent);
    if (result) {
      handleCancleClick();
      queryClient.invalidateQueries(['issues', issueId]);
    }
  };

  return (
    <S.EditCommentBlock>
      <Textarea content={editContent} setContent={setEditContent} />
      <S.ButtonContainer>
        <Button size={BUTTON_SIZE.SMALL} onClick={handleCancleClick} outline={true}>
          <Icon iconName={ICON_NAME.X_SQUARE} iconSize={ICON_SIZE.SMALL} />
          <span> 편집 취소</span>
        </Button>

        <Button size={BUTTON_SIZE.SMALL} onClick={handleSubmitClick} disabled={isSubmitDisabled}>
          <Icon iconName={ICON_NAME.EDIT_ICON} iconSize={ICON_SIZE.SMALL} />
          <span> 편집 완료</span>
        </Button>
      </S.ButtonContainer>
    </S.EditCommentBlock>
  );
};

export default EditComment;
