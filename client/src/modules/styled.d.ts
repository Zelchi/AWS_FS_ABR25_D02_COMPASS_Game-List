import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      black: string;
      white: string;
      greyLight01: string;
      greyLight02: string;
      greyLight03: string;
      greyLight04: string;
      greyLight05: string;
      grey01: string;
      grey02: string;
      grey03: string;
      grey04: string;
      grey05: string;
      grey06: string;
      grey07: string;
      grey08: string;
      greyDark01: string;
      greyDark02: string;
      greyDark03: string;
      pink: string;
      red: string;
      aqua: string;
      yellowLight: string;
    };
    fonts: {
      primary: string;
      secondary: string;
    };
    sizes: {
      mainMaxWidth: string;
      menuMaxWidth: string;
    };
    transitions: {
      fastInOut: string;
    };
  }
}
