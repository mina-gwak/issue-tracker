import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  bottom: calc(100% + 20px);
  left: 50%;
  width: 360px;
  min-height: 100px;
  border: 1px solid ${({ theme }) => theme.colors.grey4};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.white};
  transform: translateX(-11%);

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    width: 0;
    height: 0;
    border: solid transparent;
  }

  &::after {
    left: 24px;
    border-width: 16px;
    border-top-color: ${({ theme }) => theme.colors.white};
  }

  &::before {
    left: 23px;
    border-width: 17px;
    border-top-color: ${({ theme }) => theme.colors.grey4};
  }
`;

export const StoryWrapper = styled.div`
  position: absolute;
  top: 250px;
  left: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 100px;
  background-color: ${({ theme }) => theme.colors.grey5};
`;
