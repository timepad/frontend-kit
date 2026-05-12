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
  const avatarStatusClassName = classNames(
    component("avatar-status")({
      [`size-${size}`]: true,
      clickable: !!onClick,
    }),
    className,
  );
  const iconClassName = component("avatar-status", "icon")();
  const statusStyle = { "--avatar-status-bg": appearance === "custom" ? color : undefined } as CSSProperties;

  return (
    <span
      className={avatarStatusClassName}
      onClick={onClick}
      style={statusStyle}
      {...rest}
    >
      <span className={iconClassName} aria-hidden="true">{icon}</span>
    </span>
  );
};
