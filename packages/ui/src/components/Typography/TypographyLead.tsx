import { FC } from "react";

import { TypographyBase } from "./Typography";
import { ITypographyLeadProps, LEAD_VARIANT_CONFIG } from "./typography.types";

export const TypographyLead: FC<ITypographyLeadProps> = ({
  tag,
  children,
  ...props
}) => {
  const { size, uppercase } = LEAD_VARIANT_CONFIG[tag];

  return (
    <TypographyBase
      variant="lead"
      size={size}
      fontType="accent"
      fontWeight="bold"
      uppercase={uppercase}
      {...props}
    >
      {children}
    </TypographyBase>
  );
};
