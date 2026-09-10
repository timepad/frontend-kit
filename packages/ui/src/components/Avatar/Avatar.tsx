import { FC } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./avatar.less";
import { AvatarSize, IAvatarProps } from "./avatar.types";
import { AvatarStatusSize } from "./AvatarStatus/avatar-status.types";
import { AvatarStatus } from "./AvatarStatus";
import { createTypographyComponent, Typography } from "../Typography";

const AvatarComponent: FC<IAvatarProps> = ({
  text,
  size = 40,
  stroke = false,
  renderAvatarStatus,
  image,
  className,
  ...rest
}) => {
  const avatarClassName = classNames(
      component("avatar")({
        [`size-${size}`]: true,
        stroke,
      }),
      className,
  );
  const initialsClassName = component("avatar", "initials")();
  const imageClassName = component("avatar", "image")();
  const statusClassName = component("avatar", "status")();

  const TextComponent = textAvatar[size];
  const statusSize = avatarStatusSizes[size];

  return (
      <div className={avatarClassName} {...rest}>
        {image ? (
            <div className={imageClassName} role="img" style={{backgroundImage: `url("${image}")`}}/>
        ) : (
            <TextComponent as="span" className={initialsClassName}>
              {getInitials(text, size)}
            </TextComponent>
        )}

        {statusSize && renderAvatarStatus && (
            <span className={statusClassName}>
              {renderAvatarStatus({ statusSize })}
            </span>
        )}
      </div>
  );
};

export const Avatar = Object.assign(AvatarComponent, {
  AvatarStatus,
});

const avatarStatusSizes: Partial<Record<AvatarSize, AvatarStatusSize>> = {
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

const textAvatar: Record<
  AvatarSize,
  ReturnType<typeof createTypographyComponent>
> = {
  24: createTypographyComponent(Typography.Caption, "C1 BOLD"),
  32: createTypographyComponent(Typography.Paragraph, "P3 BOLD"),
  40: createTypographyComponent(Typography.Header, "H4 BOLD"),
  48: createTypographyComponent(Typography.Header, "H3 BOLD"),
  64: createTypographyComponent(Typography.Header, "H2 BOLD"),
  80: createTypographyComponent(Typography.Header, "H1 BOLD"),
};