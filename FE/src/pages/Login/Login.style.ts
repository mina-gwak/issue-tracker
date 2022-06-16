import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { flexCenter } from '@assets/styles/mixin';

export const Wrapper = styled.div`  
  ${flexCenter}
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`

export const LoginContainer = styled.div`
  margin-top: 60px;
`

export const GithubLoginButton = styled(NavLink)`
  ${flexCenter}
  gap: 10px;
  width: 340px;
  height: 64px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight:  ${({ theme }) => theme.fontWeights.bold};
  background-color: ${({ theme }) => theme.colors.black};
  border-radius: 20px;
`;