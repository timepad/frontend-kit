import { FC } from "react";

import { SnackbarBase } from "./Snackbar";
import { ISnackbarBaseProps, ISnackbarCustomProps } from "./snackbar.types";

export const SnackbarCustom: FC<ISnackbarCustomProps> = ({ icon, children, ...props }) => {
  return (
    <SnackbarBase
      {...({
        ...props,
        children,
        icon,
        variant: "custom",
      } as ISnackbarBaseProps)}
    />
  );
};
