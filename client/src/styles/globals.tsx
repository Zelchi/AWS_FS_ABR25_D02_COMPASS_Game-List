import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --color-black: #000000;
        --color-white: #FFFFFF;
        --color-grey-light-01: #E5E5E5;
        --color-grey-light-02: #CDCDCD;
        --color-grey-light-03: #E8FEFF;
        --color-grey-light-04: #F8FAFC;
        --color-grey-light-05: #C4C4C4;
        --color-grey-01: #BCBCBC;
        --color-grey-02: #6C6C6C;
        --color-grey-03: #ACACAC;
        --color-grey-04: #747474;
        --color-grey-05: #717171;
        --color-grey-06: #898989;
        --color-grey-07: #575757;
        --color-grey-dark-03: #2C2C2C;
        --color-grey-dark-01: #18181B;
        --color-grey-dark-01-89: rgba(24, 24, 27, 0.89);
        --color-grey-dark-02: #0C0A09;
        --color-grey-dark-02-95: rgba(12, 10, 9, .95);
        --color-pink: #FD4760;
        --color-red: #FF0000;
        --color-aqua: #2cb3a4;
        --color-aqua-dark: #1c9589;
        --font-primary: "Montserrat", sans-serif;
        --font-secodary: "Inter", sans-serif;
        --main-max-width: 110rem;
        --menu-max-width: 3.8rem;
        --transition: 0.2s ease-in-out;
    }

    *,
    *::after,
    *::before {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
        outline: none;
    }

    html {
        font-size: 62.5%;
    }

    body {
        box-sizing: border-box;
        font-family: sans-serif;
    }
`;

export default GlobalStyle;
