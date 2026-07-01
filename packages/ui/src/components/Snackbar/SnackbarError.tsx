import { FC } from "react";

import { SnackbarBase } from "./Snackbar";
import { IconCrossCircle24Fill } from "../../assets/icons";
import { ISnackbarBaseProps, ISnackbarVariantProps } from "./snackbar.types";

export const SnackbarError: FC<ISnackbarVariantProps> = ({ children, ...props }) => {
  return (
    <SnackbarBase
      {...({
        ...props,
        children,
        variant: "error",
        icon: <IconCrossCircle24Fill />,
      } as ISnackbarBaseProps)}
    />
  );
};
