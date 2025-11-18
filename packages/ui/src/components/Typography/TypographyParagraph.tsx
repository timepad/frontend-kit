import { FC, PropsWithChildren } from "react";

import { TypographyBase } from "./Typography";
import { ITypographyCommonProps, ParagraphSize } from "./typography.types";

export const TypographyParagraph: FC<
  PropsWithChildren<ITypographyCommonProps<ParagraphSize>>
> = ({ children, size = 1, ...props }) => {
  return (
    <TypographyBase
      variant="paragraph"
      size={size}
      fontType="regular"
      fontWeight="regular"
      {...props}
    >
      {children}
    </TypographyBase>
  );
};
