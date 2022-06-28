import SVG from 'react-inlinesvg';
import styled, { css } from 'styled-components';

import { ICON_SIZE } from '@components/common/Icon/constants';

type StyledIconProps = {
  size: string;
};

const sizeStyles = css<StyledIconProps>`
  ${({ size }) =>
    size === ICON_SIZE.SMALL &&
    css`
      width: 1rem;
    `}

  ${({ size }) =>
    size === ICON_SIZE.MEDIUM &&
    css`
      width: 1.25rem;
    `}

  ${({ size }) =>
    size === ICON_SIZE.LARGE &&
    css`
      width: 2.75rem;
    `}
`;

export const Icon = styled(SVG)<StyledIconProps>`
  flex-shrink: 0;
  ${sizeStyles}
`;
