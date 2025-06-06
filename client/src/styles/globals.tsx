import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *,
    *::after,
    *::before {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
        outline: none;
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
    }

    html {
        font-size: 62.5%;
    }

    body {
        box-sizing: border-box;
        font-family: ${({ theme }) => theme.fonts.primary};
    }
`;

export default GlobalStyle;
