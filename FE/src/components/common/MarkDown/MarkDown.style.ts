import styled from 'styled-components';

export const MarkDownStyle = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: revert;
    margin: inherit;
    line-height: initial;
  }

  pre {
    font-size: ${({ theme }) => theme.fontSizes.small};
    background-color: ${({ theme }) => theme.colors.grey5};
    border-radius: 10px;
    padding: 20px;
  }

  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.grey4};
    padding: 0 20px;
    margin: 20px 0;

    p {
      position: relative;
      top: -1px;
    }
  }

  hr {
    display: block;
    border: 0.5px solid ${({ theme }) => theme.colors.black};
  }

  ol,
  ul {
    list-style: revert;
    padding: 0 24px;
  }

  li {
    list-style: inherit;
  }

  a:link,
  a:visited {
    color: ${({ theme }) => theme.colors.blue};
  }

  a:hover,
  a:focus {
    text-decoration: underline;
  }

  img {
    width: 100%;
  }
`;
