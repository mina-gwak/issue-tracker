import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 1280px;
  margin: 0 auto;
`;

export const PageTitle = styled.h1`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.display};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.grey4};
  margin: 32px 0;
`;

export const Form = styled.form`
  & > button {
    display: block;
    margin-left: auto;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  gap: 32px;
`;

export const FormWrapper = styled.div`
  display: flex;
  gap: 32px;
`;

export const FormElements = styled.div`
  & > div {
    margin-bottom: 16px;
  }
  
  input {
    width: 100%;
  }
`;
