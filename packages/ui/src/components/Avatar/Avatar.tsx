import React, { FC } from "react";
import { classNames, component } from "@frontend-kit/utils";
import { AvatarStatusSize } from "./AvatarStatus/avatar-status.types";
import { AvatarStatus } from "./AvatarStatus";

import "./avatar.less";
import {
  AvatarSize,
  IAvatarImageProps,
  IAvatarInitialsProps,
  IAvatarProps,
} from "./avatar.types";
import { Typography } from "../Typography";

const avatarStatusSizeByAvatarSize: Partial<Record<AvatarSize, AvatarStatusSize>> = {
  40: "s",
  48: "s",
  64: "m",
  80: "l",
};

const getInitials = (name?: string, size: AvatarSize = 40) => {
  const nameTrimmed = name?.trim();
  if (!nameTrimmed) return "";

  if (size === 24 || size === 32) {
    return nameTrimmed[0].toUpperCase();
  }

  const words = nameTrimmed.split(/\s+/);

  return words.length > 1
      ? `${words[0][0]}${words[1][0]}`.toUpperCase()
      : words[0].slice(0, 2).toUpperCase();
};

export const Avatar: FC<IAvatarProps> = ({
  name,
  size = 40,
  stroke = false,
  icon,
  src,
  avatarStatusClassName,
  className,
  ...rest
}) => {
  const avatarClassName = classNames(
      component("avatar")({
        [`size-${size}`]: true,
        image: !!src,
        stroke: stroke && !src,
      }),
      className,
  );

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    rest.onClick?.(e);
  };

  const statusClassName = component("avatar", "status")();
  const defaultStatusSize = avatarStatusSizeByAvatarSize[size];

  const showStatus = icon && defaultStatusSize;
  const statusNode = showStatus && (
      <AvatarStatus
          size={defaultStatusSize}
          icon={icon}
          onClick={handleClick}
          className={avatarStatusClassName}
      />
  );

  const initialsValue = getInitials(name, size);

  return (
      <div className={avatarClassName} {...rest}>
        {src ? (
            <AvatarImage src={src} stroke={stroke} />
        ) : (
            <AvatarInitials initials={initialsValue} />
        )}

        {statusNode && <span className={statusClassName}>{statusNode}</span>}
      </div>
  );
};

const AvatarImage: FC<IAvatarImageProps> = ({ src, stroke }) => {
  const iconAvatarImageClassName = component("avatar", "image")({ stroke });

  return (
    <div className={iconAvatarImageClassName} role="img" style={{ backgroundImage: `url("${src}")` }} />
  );
};

const AvatarInitials: FC<IAvatarInitialsProps> = ({ initials }) => {
  const iconAvatarInitialsClassName = component("avatar", "initials")();

  return (
    <Typography.Paragraph as="span" tag="P4 BOLD" className={iconAvatarInitialsClassName}>
      {initials}
    </Typography.Paragraph>
  );
};