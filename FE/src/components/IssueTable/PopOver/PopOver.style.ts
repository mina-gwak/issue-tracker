import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { iconStyle, StyledIconProps } from '@styles/mixin';

const smallTextStyle = css`
  color: ${({ theme }) => theme.colors.grey2};
  font-size: ${({ theme }) => theme.fontSizes.xSmall};
`;

export const Wrapper = styled.div<StyledIconProps>`
  & > div:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey4};
  }

  * {
    font-size: 14px;
  }

  svg {
    position: relative;
    top: 3px;

    ${iconStyle}
  }
`;

export const ContentsWrapper = styled.div`
  padding: 16px;
`;

/* Issue PopOver */

export const ContentsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const Date = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors.grey2};
  margin-bottom: 4px;
`;

export const IssueLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;

  &:hover * {
    color: ${({ theme }) => theme.colors.blue};
  }
`;

export const Title = styled.h3``;

export const IssueNumber = styled.span`
  color: ${({ theme }) => theme.colors.grey2};
`;

export const IssueContents = styled.p`
  color: ${({ theme }) => theme.colors.grey2};
  margin-bottom: 12px;
`;

export const LabelList = styled.ul`
  display: flex;
  gap: 4px;

  * {
    cursor: default;
  }
`;

export const MoreLabel = styled.span`
  ${smallTextStyle};
`;

export const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
`;

export const UserDescription = styled.p`
  ${smallTextStyle};
`;

/* Author PopOver */

export const UserInformation = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

export const UserId = styled.h3``;

export const UserName = styled.span`
  color: ${({ theme }) => theme.colors.grey2};
`;
