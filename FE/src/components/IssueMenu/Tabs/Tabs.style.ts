import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { flexCenter } from '@styles/mixin';

export const TabContainer = styled.div`
  display: flex;
  width: 320px;
  height: 40px;
  border-radius: 11px;
  border: 1px solid ${({ theme }) => theme.colors.grey4};
  overflow: hidden;
`;

export const Tab = styled(Link)<{ active: string }>`
  ${flexCenter};
  width: 50%;
  background-color: ${({ active, theme }) =>
          active === 'true' ? theme.colors.grey4 : undefined};
  color: ${({ theme }) => theme.colors.black};
  transition: all 200ms;

  &:first-of-type {
    border-right: 1px solid ${({ theme }) => theme.colors.grey4};
  }

  &:hover {
    ${({ theme, active }) => active === 'false' && `background-color: ${theme.colors.grey5}`};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.grey4};
  }
`;

export const TabTitle = styled.span`
  margin: 0 4px 0 10px;
`;
