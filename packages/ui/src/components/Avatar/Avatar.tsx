import React, { FC } from "react";
import { classNames, component } from "@frontend-kit/utils";
import { AvatarStatusSize } from "./AvatarStatus/avatar-status.types";
import { AvatarStatus } from "./AvatarStatus";

import "./avatar.less";
import {
  AvatarSize,
  IAvatarProps,
} from "./avatar.types";
import { CaptionVariantTag, Typography } from "../Typography";
import { HeaderVariantTag, ParagraphVariantTag } from "../Typography/configs";

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

type InitialsVariant =
  | { variant: "caption"; tag: CaptionVariantTag }
  | { variant: "paragraph"; tag: ParagraphVariantTag }
  | { variant: "header"; tag: HeaderVariantTag };

const textVariantBySize: Record<AvatarSize, InitialsVariant> = {
  24: { variant: "caption", tag: "C1 BOLD" },
  32: { variant: "paragraph", tag: "P3 BOLD" },
  40: { variant: "header", tag: "H4 BOLD" },
  48: { variant: "header", tag: "H3 BOLD" },
  64: { variant: "header", tag: "H2 BOLD" },
  80: { variant: "header", tag: "H1 BOLD" },
};

export const Avatar: FC<IAvatarProps> = ({
  text,
  size = 40,
  stroke = false,
  icon,
  image,
  avatarStatusClassName,
  className,
  ...rest
}) => {
  const avatarClassName = classNames(
      component("avatar")({
        [`size-${size}`]: true,
        image: image,
        stroke,
      }),
      className,
  );
  const iconAvatarInitialsClassName = component("avatar", "initials")();
  const iconAvatarImageClassName = component("avatar", "image")();
  const statusClassName = component("avatar", "status")();
  const textVariant = textVariantBySize[size];

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    rest.onClick?.(e);
  };

  return (
      <div className={avatarClassName} {...rest}>
        {image ? (
            <div className={iconAvatarImageClassName} role="img" style={{backgroundImage: `url("${image}")`}}/>
        ) : (
          <>
            {textVariant.variant === "caption" && (
              <Typography.Caption as="span" tag={textVariant.tag} className={iconAvatarInitialsClassName}>
                {getInitials(text, size)}
              </Typography.Caption>
            )}
            {textVariant.variant === "paragraph" && (
              <Typography.Paragraph as="span" tag={textVariant.tag} className={iconAvatarInitialsClassName}>
                {getInitials(text, size)}
              </Typography.Paragraph>
            )}
            {textVariant.variant === "header" && (
              <Typography.Header as="span" tag={textVariant.tag} className={iconAvatarInitialsClassName}>
                {getInitials(text, size)}
              </Typography.Header>
            )}
          </>
        )}

        {icon && avatarStatusSizeByAvatarSize[size] && (
            <span className={statusClassName}>
                <AvatarStatus
                  size={avatarStatusSizeByAvatarSize[size]}
                  icon={icon}
                  onClick={handleClick}
                  className={avatarStatusClassName}
                />
            </span>
        )}
      </div>
  );
};