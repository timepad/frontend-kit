import React, {type ComponentType, FC} from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./avatar.less";
import { AvatarSize, IAvatarProps } from "./avatar.types";
import { AvatarStatusSize } from "./AvatarStatus/avatar-status.types";
import { CaptionVariantTag, Typography } from "../Typography";
import { AvatarStatus } from "./AvatarStatus";
import { HeaderVariantTag, ParagraphVariantTag } from "../Typography/configs";

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

  const { TextComponent, textTag } = textAvatar[size];
  const statusSize = avatarStatusSizes[size];

  return (
      <div className={avatarClassName} {...rest}>
        {image ? (
            <div className={imageClassName} role="img" style={{backgroundImage: `url("${image}")`}}/>
        ) : (
            <TextComponent as="span" tag={textTag} className={initialsClassName}>
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
    {
      TextComponent: ComponentType<any>;
      textTag:
          | Extract<ParagraphVariantTag, "P4 REGULAR" | "P3 BOLD">
          | Extract<HeaderVariantTag, "H4 BOLD" | "H3 BOLD" | "H2 BOLD" | "H1 BOLD">
          | Extract<CaptionVariantTag, "C1 BOLD">;
    }
> = {
  24: { TextComponent: Typography.Caption, textTag: "C1 BOLD" },
  32: {
    TextComponent: Typography.Paragraph,
    textTag: "P3 BOLD",
  },
  40: {
    TextComponent: Typography.Header,
    textTag: "H4 BOLD",
  },
  48: {
    TextComponent: Typography.Header,
    textTag: "H3 BOLD",
  },
  64: {
    TextComponent: Typography.Header,
    textTag: "H2 BOLD",
  },
  80: {
    TextComponent: Typography.Header,
    textTag: "H1 BOLD",
  },
};