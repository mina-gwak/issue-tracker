import { useState } from 'react';

import * as S from '@components/CommentList/CommentList.style';
import EditComment from '@components/CommentList/EditComment';
import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import Image from '@components/common/Image';
import { IMAGE_SIZE } from '@components/common/Image/constants';
import { commentType } from '@type/detailIssueType';
import { calcTwoTimeDifference } from '@utils/date';

interface CommentPropsType {
  comment: commentType;
}

const Comment = ({ comment }: CommentPropsType) => {
  const {
    commentUserOutline: { optionName, imageUrl },
    commentId,
    content,
    writtenTime,
  } = comment;
  const [isEdit, setIsEdit] = useState(false);
  const handleEditClick = () => setIsEdit(true);
  const handelCancelClick = () => {
    setIsEdit(false);
  };

  return (
    <S.CommentWrapper>
      <S.CommentWriterImage>
        <Image url={imageUrl} alt={optionName} size={IMAGE_SIZE.MEDIUM} />
      </S.CommentWriterImage>
      {isEdit ? (
        <EditComment
          commentId={commentId}
          content={content}
          handelCancelClick={handelCancelClick}
        />
      ) : (
        <S.CommentContainer>
          <S.CommentHeader>
            <S.CommentHeaderSection>
              <div>{optionName}</div>
              <S.CommentHeaderDate>
                {calcTwoTimeDifference(new Date(), writtenTime)}
              </S.CommentHeaderDate>
            </S.CommentHeaderSection>
            <S.CommentHeaderSection>
              <S.CommentWriter>작성자</S.CommentWriter>
              <S.CommentEditButton onClick={handleEditClick}>
                <Icon iconName={ICON_NAME.EDIT_ICON} />
                <span>편집</span>
              </S.CommentEditButton>
              <Icon iconName={ICON_NAME.EMOJI} />
            </S.CommentHeaderSection>
          </S.CommentHeader>
          <S.CommentContent>
            <span>{content}</span>
          </S.CommentContent>
        </S.CommentContainer>
      )}
    </S.CommentWrapper>
  );
};

export default Comment;
