import styled from 'styled-components';

//index.tsx
export const CommentListWrapper = styled.div`
  margin-right: 4rem;
  min-width: 550px;
`;

export const CreateButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
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
  width: 100%;
  border: 1px solid #d9dbe9;
  border-radius: 16px;
  overflow: hidden;
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding: 0.5rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.grey6};
`;

export const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1.5rem;
  flex: 1;
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
