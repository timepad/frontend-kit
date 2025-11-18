import { FC, PropsWithChildren } from "react";

import { TypographyBase } from "./Typography";
import { ITypographyCommonProps, LeadSize } from "./typography.types";

export const TypographyLead: FC<
  PropsWithChildren<ITypographyCommonProps<LeadSize>>
> = ({ children, size = 1, ...props }) => {
  return (
    <TypographyBase
      variant="lead"
      size={size}
      fontType="accent"
      fontWeight="bold"
      {...props}
    >
      {children}
    </TypographyBase>
  );
};
