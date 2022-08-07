import styled from 'styled-components';

// index.tsx
export const LabelEditFormWrapper = styled.div<{ title: string }>`
  padding: 2rem;
  margin-bottom: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.grey4};

  border-radius: ${({ title }) => (title === '새로운 레이블 추가' ? 16 : '')}px;
`;

export const Title = styled.span`
  font-size: 2rem;
  margin-bottom: 3rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 5px;
`;

// LabelCreateEdit.tsx
export const LabelEditWrapper = styled.div`
  display: grid;
  grid-template-columns: 10% 90%;
  align-items: center;
  margin-bottom: 1rem;
`;

export const RadioButtonContainer = styled.div`
  display: flex;
  align-items: center;

  gap: 12px;

  width: 30%;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.grey5};
  border: 1px solid ${({ theme }) => theme.colors.grey6};
  border-radius: 11px;
  margin: 20px 40px;
  padding: 30px 24px;
`;

export const LabelEdit = styled.div`
  display: flex;
  flex-direction: column;
  & > div {
    margin-bottom: 1rem;
  }
`;

export const LabelEditColor = styled.div`
  display: flex;
  align-items: center;
`;
