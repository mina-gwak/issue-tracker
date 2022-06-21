import styled from 'styled-components';

export const Wrapper = styled.form`
  display: flex;
  flex-shrink: 0;
  width: 601px;
  height: 40px;
  border-radius: 11px;
`;

export const FilterButtonWrapper = styled.div`
  position: relative;
`;

export const FilterButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 128px;
  height: 100%;
  color: ${({ theme }) => theme.colors.grey2};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  background-color: ${({ theme }) => theme.colors.grey6};
  border: 1px solid ${({ theme }) => theme.colors.grey4};
  border-radius: 11px 0 0 11px;
  padding: 12px 24px;
  transition: all 200ms;

  path {
    position: relative;
    top: 1px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.grey1};
    background-color: ${({ theme }) => theme.colors.grey4};
    
    path {
      stroke: ${({ theme }) => theme.colors.grey1};
    }
  }
`;

export const FilterInputWrapper = styled(FilterButtonWrapper)`
  flex-grow: 1;

  svg {
    position: absolute;
    top: 50%;
    left: 24px;
    transform: translateY(-50%);
    
    path {
      transition: all 200ms;
    }
  }
`;

export const FilterInput = styled.input`
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.colors.grey3};
  background-color: ${({ theme }) => theme.colors.grey5};
  border: 1px solid ${({ theme }) => theme.colors.grey4};
  border-left: none;
  border-radius: 0 11px 11px 0;
  padding: 6px 24px 6px 48px;
  transition: all 200ms;

  &::placeholder {
    color: ${({ theme }) => theme.colors.grey3};
  }

  &:focus {
    color: ${({ theme }) => theme.colors.black};
    background-color: ${({ theme }) => theme.colors.grey6};
    
    & + svg {
      path {
        stroke: ${({ theme }) => theme.colors.grey2};
      }
    }
  }
`;
