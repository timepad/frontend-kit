import { FC } from "react";

import { TypographyBase } from "./Typography";
import {
  ITypographyHeaderProps,
  HEADER_VARIANT_CONFIG,
} from "./typography.types";

export const TypographyHeader: FC<ITypographyHeaderProps> = ({
  tag,
  children,
  ...props
}) => {
  const { size, fontType, fontWeight } = HEADER_VARIANT_CONFIG[tag];
  return (
    <TypographyBase
      variant="header"
      size={size}
      fontType={fontType}
      fontWeight={fontWeight}
      {...props}
    >
      {children}
    </TypographyBase>
  );
};
