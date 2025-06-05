import React, { FunctionComponent } from "react";

export type ShortcutProps = {
  icon: FunctionComponent<React.SVGProps<SVGSVGElement>>;
  title: string;
  qty: number | undefined;
  plusIcon?: FunctionComponent<React.SVGProps<SVGSVGElement>>;
};
