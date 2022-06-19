import styled from 'styled-components';

import { pageContentCenter } from '@assets/styles/mixin';

export const Wrapper = styled.div`
  ${pageContentCenter}
`;

export const Title = styled.h1`
  font-size: 5rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: 30px;
`;

export const BoldMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: 6px;
`;

export const Message = styled.p`
  color: ${({ theme }) => theme.colors.grey3};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  margin-bottom: 30px;
`;
