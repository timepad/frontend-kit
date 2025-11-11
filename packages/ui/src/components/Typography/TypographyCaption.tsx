import { FC, PropsWithChildren } from "react";

import { TypographyBase } from "./Typography";
import { ITypographyCommonProps, CaptionSize } from "./typography.types";

export const TypographyCaption: FC<
  PropsWithChildren<ITypographyCommonProps<CaptionSize>>
> = ({ children, size = 1, ...props }) => {
  return (
    <TypographyBase {...props} variant="caption" size={size}>
      {children}
    </TypographyBase>
  );
};
