import { useState } from 'react';

import * as S from '@components/CommentList/CommentList.style';
import EditComment from '@components/CommentList/EditComment';
import Icon from '@components/common/Icon';
import { ICON_NAME } from '@components/common/Icon/constants';
import Image from '@components/common/Image';
import { IMAGE_SIZE } from '@components/common/Image/constants';
import MarkDown from '@components/common/MarkDown';
import { commentType, issueContentType } from '@type/detailIssueType';
import { calcTwoTimeDifference } from '@utils/date';

interface CommentPropsType {
  issueId?: number;
  comment?: commentType;
  issueContent?: issueContentType;
  editable: boolean;
  issueWriter: string;
}

const Comment = ({ issueId, comment, issueContent, editable, issueWriter }: CommentPropsType) => {
  const {
    writerOutline: { optionName, imageUrl },
    content,
    writtenTime,
  } = (comment || issueContent)!; //writerOutline 백엔드 변경 전

  const [isEdit, setIsEdit] = useState(false);
  const currentCommentId = comment?.commentId || 0;
  const isEditable = editable && comment?.status === 'INITIAL';

  const handleEditClick = () => setIsEdit(true);
  const handleCancelClick = () => {
    setIsEdit(false);
  };

  return (
    <S.CommentWrapper>
      <S.CommentWriterImage>
        <Image url={imageUrl} alt='유저 이미지' size={IMAGE_SIZE.MEDIUM} />
      </S.CommentWriterImage>
      {isEdit ? (
        <EditComment
          issueId={issueId}
          commentId={currentCommentId}
          content={content}
          handleCancleClick={handleCancelClick}
        />
      ) : (
        <S.CommentContainer status={comment?.status || 'INITIAL'}>
          <S.CommentHeader>
            <S.CommentHeaderLeftSection>
              <p>{optionName}</p>
              <S.CommentHeaderDate>
                {calcTwoTimeDifference(new Date(), writtenTime)}
              </S.CommentHeaderDate>
            </S.CommentHeaderLeftSection>
            <S.CommentHeaderRightSection>
              {issueWriter === optionName && <S.CommentWriter>작성자</S.CommentWriter>}
              {isEditable && (
                <>
                  <S.CommentEditButton onClick={handleEditClick}>
                    <Icon iconName={ICON_NAME.EDIT_ICON} />
                    <span>편집</span>
                  </S.CommentEditButton>
                </>
              )}

              <Icon iconName={ICON_NAME.EMOJI} />
            </S.CommentHeaderRightSection>
          </S.CommentHeader>
          <S.CommentContent>
            <MarkDown>{content}</MarkDown>
          </S.CommentContent>
        </S.CommentContainer>
      )}
    </S.CommentWrapper>
  );
};

export default Comment;
