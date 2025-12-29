import { FC } from "react";

import { TypographyBase } from "./Typography";
import { LEAD_VARIANT_CONFIG, LeadVariantTag } from "./configs";
import { ITypographyCommonProps } from "./typography.types";

interface ITypographyLeadProps extends ITypographyCommonProps {
  tag: LeadVariantTag;
}

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
