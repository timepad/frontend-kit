import { FC } from "react";

import { SnackbarBase } from "./Snackbar";
import { IconCheckCircle24Fill } from "../../assets/icons";
import { ISnackbarBaseProps, ISnackbarVariantProps } from "./snackbar.types";

export const SnackbarSuccess: FC<ISnackbarVariantProps> = ({ children, ...props }) => {
  return (
    <SnackbarBase
      {...({
        ...props,
        children,
        variant: "success",
        icon: <IconCheckCircle24Fill />,
      } as ISnackbarBaseProps)}
    />
  );
};
