import styled from 'styled-components';

export const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: center;
  width: 1280px;
  height: 94px;
  margin: 0 auto 32px;
`;

export const LogoutMenuWrapper = styled.div`
  position: relative;
`;

export const LogoutMenuButton = styled.button`
  border-radius: 50%;
  
  img {
    display: block;
  }
`;

export const LogoutMenu = styled.ul`
  position: absolute;
  top: 120%;
  right: 0;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.grey4};
  border-radius: 16px;
`;

export const LogoutMenuItem = styled.li`
`;

export const LogoutButton = styled.button`
  padding: 8px 16px;
`;
