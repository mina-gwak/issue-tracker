import { useState } from 'react';

import * as S from '@components/CommentList/CommentList.style';
import EditComment from '@components/CommentList/EditComment';
import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import Image from '@components/common/Image';
import { IMAGE_SIZE } from '@components/common/Image/constants';
import { commentType, issueContentType } from '@type/detailIssueType';
import { calcTwoTimeDifference } from '@utils/date';

interface CommentPropsType {
  comment?: commentType;
  issueContent?: issueContentType;
  editable: boolean;
}

const Comment = ({ comment, issueContent, editable }: CommentPropsType) => {
  const {
    writerOutline: { optionName, imageUrl },
    content,
    writtenTime,
  } = (comment || issueContent)!; //writerOutline 백엔드 변경 전

  const [isEdit, setIsEdit] = useState(false);
  const currentCommentId = comment?.commentId || 0;
  const handleEditClick = () => setIsEdit(true);
  const handelCancelClick = () => {
    setIsEdit(false);
  };

  return (
    <S.CommentWrapper>
      <S.CommentWriterImage>
        <Image url={imageUrl} alt='유저 이미지' size={IMAGE_SIZE.MEDIUM} />
      </S.CommentWriterImage>
      {isEdit ? (
        <EditComment
          commentId={currentCommentId}
          content={content}
          handelCancelClick={handelCancelClick}
        />
      ) : (
        <S.CommentContainer status={comment?.status || 'INITIAL'}>
          <S.CommentHeader>
            <S.CommentHeaderSection>
              <div>{optionName}</div>
              <S.CommentHeaderDate>
                {calcTwoTimeDifference(new Date(), writtenTime)}
              </S.CommentHeaderDate>
            </S.CommentHeaderSection>
            <S.CommentHeaderSection>
              {editable && (
                <>
                  <S.CommentWriter>작성자</S.CommentWriter>
                  <S.CommentEditButton onClick={handleEditClick}>
                    <Icon iconName={ICON_NAME.EDIT_ICON} />
                    <span>편집</span>
                  </S.CommentEditButton>
                </>
              )}

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
