import { FC } from "react";

import { TypographyBase } from "./Typography";
import { PARAGRAPH_VARIANT_CONFIG, ParagraphVariantTag } from "./configs";
import { ITypographyCommonProps } from "./typography.types";

interface ITypographyParagraphProps extends ITypographyCommonProps {
  tag: ParagraphVariantTag;
}

export const TypographyParagraph: FC<ITypographyParagraphProps> = ({
  tag,
  children,
  ...props
}) => {
  const { size, fontWeight, uppercase } = PARAGRAPH_VARIANT_CONFIG[tag];
  return (
    <TypographyBase
      variant="paragraph"
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
