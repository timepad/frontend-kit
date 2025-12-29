import { FC } from "react";

import { TypographyBase } from "./Typography";
import { CAPTION_VARIANT_CONFIG, CaptionVariantTag } from "./configs";
import { ITypographyCommonProps } from "./typography.types";

interface ITypographyCaptionProps extends ITypographyCommonProps {
  tag: CaptionVariantTag;
}

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
