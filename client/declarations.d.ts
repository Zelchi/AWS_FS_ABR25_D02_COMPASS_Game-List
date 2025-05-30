// declarations.d.ts

/// <reference types="vite-plugin-svgr/client" />

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.svg?react" {
  import * as React from "react";
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export { ReactComponent };
  export default ReactComponent;
}
