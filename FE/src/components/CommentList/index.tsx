import { useState } from 'react';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import Comment from '@components/CommentList/Comment';
import * as S from '@components/CommentList/CommentList.style';
import Button from '@components/common/Button';
import { BUTTON_SIZE } from '@components/common/Button/constants';
import Image from '@components/common/Image';
import { IMAGE_SIZE } from '@components/common/Image/constants';
import Textarea from '@components/common/Textarea';
import { detailIssueTrigger } from '@store/detailIssue';
import { userState } from '@store/user';
import { commentType } from '@type/detailIssueType';
import { createComment } from '@utils/api/fetchComment';

interface CommentListPropsType {
  issueId: number;
  comments: commentType[];
}

const CommentList = ({ issueId, comments }: CommentListPropsType) => {
  const [comment, setComment] = useState('');
  const setDetailIssueTrigger = useSetRecoilState(detailIssueTrigger);
  const { name, image } = useRecoilValue(userState);

  const handleCreateCommentClick = async () => {
    if (!comment) return;
    const createCommentResult = await createComment(issueId, comment);
    if (createCommentResult) {
      setDetailIssueTrigger((triggerCount) => triggerCount + 1);
      setComment('');
    }
  };

  const commentList = comments.map((comment: commentType, idx: number) => (
    <Comment key={issueId + idx} comment={comment} />
  ));

  return (
    <S.CommentListWrapper>
      {commentList}
      <S.TextAreaContainer>
        <S.CommentWriterImage>
          <Image url={image} alt={name} size={IMAGE_SIZE.MEDIUM} />
        </S.CommentWriterImage>
        <Textarea comment={comment} setComment={setComment} />
      </S.TextAreaContainer>
      <S.CreateButton>
        <Button size={BUTTON_SIZE.SMALL} onClick={handleCreateCommentClick}>
          <span> + 코멘트 작성</span>
        </Button>
      </S.CreateButton>
    </S.CommentListWrapper>
  );
};

export default CommentList;
