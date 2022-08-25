import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { iconStyle, StyledIconProps } from '@styles/mixin';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  width: auto;
  min-width: 1200px;
  height: 90px;
  background: ${({ theme }) => theme.colors.white};
  padding: 16px 63px 16px 32px;

  &:not(:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey4};
  }

  label {
    position: relative;
    top: -15px;
  }
`;

export const Container = styled.div`
  margin-right: auto;
  cursor: pointer;
`;

export const IssueBox = styled.div`
  display: flex;
  width: 100%;
`;

// -----------------------------------

export const IssueTitleWrapper = styled.div<StyledIconProps>`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  svg {
    ${iconStyle}
  }
`;

export const IssuePopOverWrapper = styled.div`
  position: relative;
  margin: 0 16px 0 8px;
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.black};
`;

export const LabelList = styled.div`
  display: flex;
  gap: 4px;
`;

// -----------------------------------

export const AuthorPopOverWrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

export const Description = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const TimeStamp = styled.div`
  color: ${({ theme }) => theme.colors.grey2};
`;

export const Text = styled.span`
  color: ${({ theme }) => theme.colors.grey2};
`;

export const Milestone = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;

  path {
    fill: ${({ theme }) => theme.colors.grey2};
  }
`;
