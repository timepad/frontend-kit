import { CSSProperties, FC } from "react";
import { classNames, component } from "@frontend-kit/utils";
import { IconCheck16Outline, IconCheck24Outline } from "../../../assets/icons";

import "./avatar-status.less";
import { IAvatarStatusProps } from "./avatar-status.types";

export const AvatarStatus: FC<IAvatarStatusProps> = ({
  as = "span",
  size = "m",
  appearance = "accent",
  color,
  className,
  ...rest
}) => {
  const statusClassName = classNames(
    component("avatar-status")({
      [`size-${size}`]: true,
    }),
    className,
  );

  const iconClassName = component("avatar-status", "icon")();
  const statusColor = appearance === "custom" && (color ?? "var(--accent-positive)");
  const statusStyle = {...(statusColor && { "--avatar-status-bg": statusColor })} as CSSProperties;

  const iconNode = (size === "l" ? <IconCheck24Outline /> : <IconCheck16Outline />);

  if (as === "button") {
    return (
      <button
        type="button"
        className={statusClassName}
        style={statusStyle}
        {...rest}
      >
        <span className={iconClassName} aria-hidden="true">
          {iconNode}
        </span>
      </button>
    );
  }

  return (
    <span
      className={statusClassName}
      style={statusStyle}
      {...rest}
    >
      <span className={iconClassName} aria-hidden="true">
        {iconNode}
      </span>
    </span>
  );
};
