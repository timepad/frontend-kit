import { FC, PropsWithChildren } from "react";

import { TypographyBase } from "./Typography";
import { ITypographyCommonProps, HeaderSize } from "./typography.types";

export const TypographyHeader: FC<
  PropsWithChildren<ITypographyCommonProps<HeaderSize>>
> = ({ children, size = 1, ...props }) => {
  return (
    <TypographyBase
      variant="header"
      size={size}
      fontType="regular"
      fontWeight="bold"
      {...props}
    >
      {children}
    </TypographyBase>
  );
};
