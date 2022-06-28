import styled from 'styled-components';

import { flexBetween } from '@styles/mixin';

export const MenuList = styled.div<{ position: string }>`
  position: absolute;
  width: 200px;
  right: ${({ position }) => position === 'right' && 0}px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.grey4};
  border-radius: 11px;
  margin-top: 8px;
  z-index: 1;
  overflow: hidden;
`;

export const MenuTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  background-color: ${({ theme }) => theme.colors.grey6};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey4};
  padding: 8px 16px;
`;

export const MenuOptionGroup = styled.div`
  ${flexBetween};
  padding: 6px 16px;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey4};
  }
`;

export const MenuOptionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const MenuItemOption = styled.span`
  font-size: 14px;
`;

export const CircleColorIcon = styled.div<{ colorIcon: string }>`
  width: 18px;
  height: 18px;
  background-color: ${({ colorIcon }) => colorIcon};
  border: 1px solid ${({ theme }) => theme.colors.grey4};
  border-radius: 50px;
`;
