import styled from 'styled-components';

export const Wrapper = styled.aside`
  width: 308px;
  height: fit-content;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.grey4};
  border-radius: 16px;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Text = styled.span`
  color: ${({ theme }) => theme.colors.grey2};
`;
