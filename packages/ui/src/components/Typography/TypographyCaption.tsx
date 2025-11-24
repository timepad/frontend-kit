import { FC } from "react";

import { TypographyBase } from "./Typography";
import {
  ITypographyCaptionProps,
  CAPTION_VARIANT_CONFIG,
} from "./typography.types";

export const TypographyCaption: FC<ITypographyCaptionProps> = ({
  tag,
  children,
  ...props
}) => {
  const { size, fontWeight, uppercase } = CAPTION_VARIANT_CONFIG[tag];
  return (
    <TypographyBase
      variant="caption"
      size={size}
      fontType="regular"
      fontWeight={fontWeight}
      uppercase={uppercase}
      {...props}
    >
      {children}
    </TypographyBase>
  );
};
