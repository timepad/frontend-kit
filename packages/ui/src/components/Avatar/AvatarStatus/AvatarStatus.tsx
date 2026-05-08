import { CSSProperties, FC } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./avatar-status.less";
import { IAvatarStatusProps } from "./avatar-status.types";

export const AvatarStatus: FC<IAvatarStatusProps> = ({
  size = "m",
  appearance = "accent",
  color,
  icon,
  onClick,
  className,
  ...rest
}) => {
  const statusClassName = classNames(
    component("avatar-status")({
      [`size-${size}`]: true,
      clickable: !!onClick,
    }),
    className,
  );

  const iconClassName = component("avatar-status", "icon")();
  const statusColor = appearance === "custom" && (color ?? "var(--accent-positive)");
  const statusStyle = {...(statusColor && { "--avatar-status-bg": statusColor })} as CSSProperties;

  return (
    <span
      className={statusClassName}
      onClick={onClick}
      style={statusStyle}
      {...rest}
    >
      {icon && <span className={iconClassName} aria-hidden="true">{icon}</span>}
    </span>
  );
};
