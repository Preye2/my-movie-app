// src/styles/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset} /* Optional reset for consistency across browsers */

  body {
    font-family: 'Segoe UI', sans-serif;
    background-color: ${({ theme }) => theme.body || '#f5f5f5'};
    color: ${({ theme }) => theme.text || '#222'};
    line-height: 1.6;
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4 {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s;
  }

  button {
    font-family: inherit;
    font-size: 1rem;
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 8px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  button:hover {
    background-color: #0056b3;
  }

  input, select, textarea {
    font-family: inherit;
    font-size: 1rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    outline: none;
  }

  .glass {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  }
`;

export default GlobalStyle;
