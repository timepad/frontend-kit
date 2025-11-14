import { FC, PropsWithChildren } from "react";

import { TypographyBase } from "./Typography";
import { ITypographyCommonProps, HeaderSize } from "./typography.types";

export const TypographyHeader: FC<
  PropsWithChildren<ITypographyCommonProps<HeaderSize>>
> = ({ children, size = 1, ...props }) => {
  return (
    <TypographyBase {...props} variant="header" size={size}>
      {children}
    </TypographyBase>
  );
};
