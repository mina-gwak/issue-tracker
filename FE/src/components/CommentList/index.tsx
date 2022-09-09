import { useState } from 'react';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import Comment from '@components/CommentList/Comment';
import * as S from '@components/CommentList/CommentList.style';
import Button from '@components/common/Button';
import { BUTTON_SIZE } from '@components/common/Button/constants';
import Image from '@components/common/Image';
import { IMAGE_SIZE } from '@components/common/Image/constants';
import Textarea from '@components/common/Textarea';
import { queryClient } from '@src';
import { detailIssueTrigger } from '@store/detailIssue';
import { userState } from '@store/user';
import { commentType, issueContentType } from '@type/detailIssueType';
import { createComment } from '@utils/api/fetchComment';

interface CommentListPropsType {
  issueId: number;
  commentOutlines: commentType[];
  issueOutline: issueContentType;
  editable: boolean;
}

const CommentList = ({
  issueId,
  commentOutlines,
  issueOutline,
  editable,
}: CommentListPropsType) => {
  const [content, setContent] = useState('');
  const setDetailIssueTrigger = useSetRecoilState(detailIssueTrigger);
  const { name, image } = useRecoilValue(userState);

  const handleCreateCommentClick = async () => {
    if (!content) return;
    const createCommentResult = await createComment(issueId, content);
    if (createCommentResult) {
      setDetailIssueTrigger((triggerCount) => triggerCount + 1);
      setContent('');
      queryClient.invalidateQueries(['issues', issueId]);
    }
  };

  const commentList = commentOutlines.map((comment: commentType) => (
    <Comment key={comment.commentId} comment={comment} editable={comment.editable} issueWriter={issueOutline.writerOutline.optionName} />
  ));

  return (
    <S.CommentListWrapper>
      <Comment issueId={issueId} issueContent={issueOutline} editable={editable} issueWriter={issueOutline.writerOutline.optionName} />
      {commentList}
      <S.TextAreaContainer>
        <S.CommentWriterImage>
          <Image url={image} alt={name} size={IMAGE_SIZE.MEDIUM} />
        </S.CommentWriterImage>
        <Textarea content={content} setContent={setContent} />
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
