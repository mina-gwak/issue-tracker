import styled from 'styled-components';

import { pageContentCenter, flexCenter } from '@assets/styles/mixin';

export const Wrapper = styled.div`  
  ${pageContentCenter}
`;

export const LoginContainer = styled.div`
  margin-top: 60px;
`;

export const GithubLoginButton = styled.a`
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