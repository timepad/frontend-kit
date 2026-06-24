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
  className,
  icon,
  variant,
  title,
  children,
  actionButton,
  actionLabel,
  onActionClick,
  actionAriaLabel = "Закрыть",
  ...props
}) => {
  const snackbarClasses = classNames(component("snackbar")(), className);

  const contentClassName = component("snackbar", "content")();
  const iconContainerClassName = component("snackbar", "icon-container")();
  const iconClassName = component("snackbar", "icon")({
    [`${variant}`]: !!variant && variant !== "custom",
  });
  const textClassName = component("snackbar", "text")();
  const titleClassName = component("snackbar", "title")();
  const messageClassName = component("snackbar", "message")();
  const actionButtonContainerClassName = component("snackbar", "action-button-container")();
  const actionButtonClassName = component("snackbar", "action-button")();

  const showActionButton = actionButton === "button" && actionLabel;
  const showActionIconButton = actionButton === "icon-button";

  return (
    <div className={snackbarClasses} {...props}>
      <div className={contentClassName}>
        <div className={iconContainerClassName}>
          <div className={iconClassName} aria-hidden="true">
            {icon}
          </div>
        </div>

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
          <div className={actionButtonContainerClassName}>
            <Button
              type="button"
              className={actionButtonClassName}
              label={actionLabel}
              size="s"
              variant="transparent"
              onClick={onActionClick}
            />
          </div>
        )}

        {showActionIconButton && (
          <div className={actionButtonContainerClassName}>
            <IconButton
              type="button"
              className={actionButtonClassName}
              icon={<IconCross24Outline />}
              size="s"
              variant="transparent"
              ariaLabel={actionAriaLabel}
              onClick={onActionClick}
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
