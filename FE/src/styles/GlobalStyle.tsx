import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  :after,
  :before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  html {
    overflow-y: scroll;
  }

  body {
    margin: 0;
    line-height: 1.5;
    height: 100%;
    font-family: "Noto Sans KR", sans-serif;
    color: ${({ theme }) => theme.colors.grey1};
    font-size: ${({ theme }) => theme.fontSizes.small};
    background-color: ${({ theme }) => theme.colors.grey6};
  }

  html,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  form,
  fieldset {
    margin: 0;
    padding: 0;
    border: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 1em;
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  header ul,
  nav ul,
  footer ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  legend {
    position: absolute;
    font-size: 0;
    line-height: 0;
    text-indent: -9999em;
    overflow: hidden;
  }

  label,
  input,
  button,
  select {
    font-family: 'Noto Sans KR', sans-serif;
    vertical-align: middle;
  }

  input,
  button {
    margin: 0;
    padding: 0;
    font-size: 1em;
  }

  button,
  input[type="submit"] {
    cursor: pointer;
  }

  button {
    padding: 0;
    border: none;
    font: inherit;
    color: inherit;
    background-color: transparent;
    cursor: pointer;
  }

  button:focus {
    outline: none;
  }

  input[type="checkbox"],
  input[type="text"],
  input[type="tel"],
  input[type="password"],
  input[type="submit"],
  input[type="image"],
  button,
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  input[type="text"],
  input[type="tel"],
  input[type="password"],
  textarea,
  select {
    outline: none;
  }

  textarea,
  select {
    font-size: 1em;
  }

  select::-ms-expand {
    display: none;
  }

  textarea {
    resize: none;
    border-radius: 0;
    -webkit-appearance: none;
  }

  p {
    margin: 0;
    padding: 0;
    word-break: break-all;
  }

  hr {
    display: none;
  }

  pre {
    overflow-x: scroll;
    font-size: 1.1em;
  }

  a:link,
  a:visited {
    color: inherit;
    text-decoration: none;
  }

  ul,
  li,
  dl,
  dt,
  dd {
    padding: 0;
    margin: 0;
  }

  ul,
  li {
    list-style: none;
  }

  strong {
    font-weight: bold;
  }
`;

export default GlobalStyle;
