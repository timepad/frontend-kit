import { FC } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./snackbar.less";
import { Typography } from "../Typography";
import { Button } from "../Button";
import { IconButton } from "../IconButton";
import { IconCross24Outline } from "../../assets/icons";
import { ISnackbarBaseProps } from "./snackbar.types";
import { SnackbarInfo } from "./SnackbarInfo";
import { SnackbarWarning } from "./SnackbarWarning";
import { SnackbarError } from "./SnackbarError";
import { SnackbarSuccess } from "./SnackbarSuccess";
import { SnackbarCustom } from "./SnackbarCustom";

export const SnackbarBase: FC<ISnackbarBaseProps> = ({
  children,
  className,
  icon,
  variant,
  title,
  after = false,
  actionLabel,
  onAction,
  actionAriaLabel = "Закрыть",
  ...props
}) => {
  const snackbarClasses = classNames(component("snackbar")(), className);

  const contentClassName = component("snackbar", "content")();
  const leftClassName = component("snackbar", "left")();
  const iconClassName = component("snackbar", "icon")({
    [`${variant}`]: !!variant && variant !== "custom",
  });
  const textClassName = component("snackbar", "text")();
  const titleClassName = component("snackbar", "title")();
  const messageClassName = component("snackbar", "message")();
  const rightClassName = component("snackbar", "right")();
  const actionButtonClassName = component("snackbar", "action-button")();
  const actionIconButtonClassName = component("snackbar", "action-icon-button")();

  const showActionButton = after === "button" && actionLabel;
  const showActionIconButton = after === "icon-button";

  return (
    <div className={snackbarClasses} {...props}>
      <div className={contentClassName}>
        {icon && (
          <div className={leftClassName}>
            <div className={iconClassName} aria-hidden="true">
              {icon}
            </div>
          </div>
        )}

        <div className={textClassName}>
          {title && (
            <Typography.Paragraph
              tag="P4 BOLD"
              as="span"
              className={titleClassName}
            >
              {title}
            </Typography.Paragraph>
          )}
          <Typography.Paragraph
            tag="P4 REGULAR"
            as="span"
            className={messageClassName}
          >
            {children}
          </Typography.Paragraph>
        </div>

        {showActionButton && (
          <div className={rightClassName}>
            <Button
              type="button"
              className={actionButtonClassName}
              label={actionLabel}
              size="s"
              variant="transparent"
              onClick={onAction}
            />
          </div>
        )}

        {showActionIconButton && (
          <div className={rightClassName}>
            <IconButton
              type="button"
              className={actionIconButtonClassName}
              icon={<IconCross24Outline />}
              size="s"
              variant="transparent"
              ariaLabel={actionAriaLabel}
              onClick={onAction}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export const Snackbar = Object.assign(SnackbarBase, {
  Info: SnackbarInfo,
  Warning: SnackbarWarning,
  Error: SnackbarError,
  Success: SnackbarSuccess,
  Custom: SnackbarCustom,
});
