import styled from 'styled-components';

//index.ts
export const Wrapper = styled.div`
  width: 1280px;
  border: 1px solid ${({ theme }) => theme.colors.grey4};
  border-radius: 11px;
  overflow: hidden;

  & > *:last-child {
    border-radius: 0 0 11px 11px;
  }
`;

//MilestoneTableHeader
export const MilestoneTableHeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  height: 64px;
  background-color: ${({ theme }) => theme.colors.grey6};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey4};
  border-radius: 16px 16px 0 0;
  padding: 0 32px;
`;

export const MilestoneTab = styled.div<{ focus: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;

  color: ${({ focus, theme }) => focus && theme.colors.black};
  font-weight: ${({ focus, theme }) => focus && theme.fontWeights.bold};
`;

//MilestoneInfo
export const MilestoneItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${({ theme }) => theme.colors.grey2};
  padding: 10px;
`;

export const MilestoneInfoTitle = styled.div`
  display: flex;
  div {
    padding-left: 12px;
  }
`;

export const LeftContainer = styled.div``;

export const Description = styled.div`
  display: flex;
  padding-top: 5px;
  margin-left: 12px;
`;

export const RightContainer = styled.div`
  width: 245px;
`;

export const EditIcons = styled.div`
  cursor: pointer;
  display: flex;
  font-size: ${({ theme }) => theme.fontSizes.xSmall}px;
  justify-content: flex-end;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

export const IconText = styled.span`
  margin-left: 5px;
`;

export const DeleteIcon = styled.div`
  color: ${({ theme }) => theme.colors.red};
`;

export const StateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fontSizes.xSmall}px;
`;
