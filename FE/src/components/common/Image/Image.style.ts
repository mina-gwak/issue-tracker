import styled, { css } from 'styled-components';

import { IMAGE_SIZE } from '@components/common/Image/constants';

type StyledImageProps = {
  size?: string;
};

export const sizeStyles = css<StyledImageProps>`
  ${({ size }) =>
    size === IMAGE_SIZE.SMALL &&
    css`
      display: block;
      width: 1.25rem;
      height: 1.25rem;
      border: 1px solid ${({ theme }) => theme.colors.grey4};
      border-radius: 50%;
    `}

  ${({ size }) =>
    size === IMAGE_SIZE.MEDIUM &&
    css`
      display: block;
      width: 2.75rem;
      height: 2.75rem;
      border: 1px solid ${({ theme }) => theme.colors.grey4};
      border-radius: 50%;
    `}

  ${({ size }) =>
    size === IMAGE_SIZE.LARGE &&
    css`
      display: block;
      width: 4rem;
      height: 4rem;
      border: 1px solid ${({ theme }) => theme.colors.grey4};
      border-radius: 50%;
    `}
`;

export const Image = styled.img`
  ${sizeStyles}
`;
