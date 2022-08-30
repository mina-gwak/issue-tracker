import styled from 'styled-components';

//index.tsx
export const CommentListWrapper = styled.div`
  min-width: 550px;
`;

export const CreateButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

export const TextAreaContainer = styled.div`
  display: flex;
`;

//Comment.tsx
export const CommentWrapper = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`;

export const CommentWriterImage = styled.div`
  margin-right: 1rem;

  img {
    margin-top: 0.7rem;
    width: 44px;
    height: 44px;
  }
`;

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 880px;
  border: 1px solid #d9dbe9;
  border-radius: 16px;
  overflow: hidden;
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  background-color: ${({ theme }) => theme.colors.grey6};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey4};
  padding: 18px 24px;
`;

export const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 28px;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 16px 24px;
`;

export const CommentHeaderSection = styled.div`
  display: flex;
  align-items: center;

  &:last-child {
    & > div,
    & > svg {
      cursor: pointer;
    }

    & > div {
      margin-right: 1rem;
    }
  }
`;

export const CommentHeaderDate = styled.div`
  margin-left: 8px;
  color: ${({ theme }) => theme.colors.grey2};
`;

export const CommentWriter = styled.span`
  border: ${({ theme }) => `1px solid ${theme.colors.grey6}`};
  border-radius: 30px;
  padding: 2px 16px;
`;

export const CommentEditButton = styled.div`
  display: flex;
  align-items: center;
`;

//EditComment.tsx
export const EditCommentBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;
