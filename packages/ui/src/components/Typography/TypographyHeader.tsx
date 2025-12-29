import { FC } from "react";

import { TypographyBase } from "./Typography";
import { HEADER_VARIANT_CONFIG, HeaderVariantTag } from "./configs";
import { ITypographyCommonProps } from "./typography.types";

interface ITypographyHeaderProps extends ITypographyCommonProps {
  tag: HeaderVariantTag;
}

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
