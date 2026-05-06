import { FC } from "react";
import { classNames, component } from "@frontend-kit/utils";
import { AvatarStatusSize } from "./AvatarStatus/avatar-status.types";
import {AvatarStatus} from "./AvatarStatus";

import "./avatar.less";
import {
  AvatarSize,
  IAvatarImageProps,
  IAvatarInitialsProps,
  IAvatarProps,
} from "./avatar.types";

const avatarSizeWithSingleInitials: AvatarSize[] = [24, 32];
const avatarStatusSizeByAvatarSize: Partial<Record<AvatarSize, AvatarStatusSize>> = {
  40: "s",
  48: "s",
  64: "m",
  80: "l",
};

const getInitials = (
  sourceInitials?: string,
  sourceName?: string,
  size: AvatarSize = 40,
) => {
  const preparedInitials = sourceInitials?.trim();

  if (preparedInitials) {
    return avatarSizeWithSingleInitials.includes(size)
      ? preparedInitials[0].toUpperCase()
      : preparedInitials.slice(0, 2).toUpperCase();
  }

  const preparedName = sourceName?.trim();

  if (!preparedName) {
    return "";
  }

  const words = preparedName.split(/\s+/).filter(Boolean);

  if (words.length > 1) {
    const initials = `${words[0][0]}${words[1][0]}`.toUpperCase();
    return avatarSizeWithSingleInitials.includes(size)
      ? initials[0]
      : initials;
  }

  const singleWordInitials = words[0].slice(0, 2).toUpperCase();

  return avatarSizeWithSingleInitials.includes(size)
    ? singleWordInitials[0]
    : singleWordInitials;
};

export const Avatar: FC<IAvatarProps> = ({
  src,
  alt,
  name,
  initials,
  size = 40,
  square = false,
  bordered = false,
  withStatus = false,
  className,
  ...rest
}) => {
  const avatarClassName = classNames(
    component("avatar")({
      square,
      bordered,
      [`size-${size}`]: true,
      image: !!src,
    }),
    className,
  );

  const statusClassName = component("avatar", "status")();
  const defaultStatusSize = avatarStatusSizeByAvatarSize[size];

  const showStatus = withStatus && defaultStatusSize;
  const statusNode = showStatus && <AvatarStatus size={defaultStatusSize} />;

  const initialsValue = getInitials(initials, name, size);

  return (
    <div className={avatarClassName} {...rest}>
      {src ? (
        <AvatarImage src={src} />
      ) : (
        <AvatarInitials initials={initialsValue} />
      )}

      {statusNode && <span className={statusClassName}>{statusNode}</span>}
    </div>
  );
};

const AvatarImage: FC<IAvatarImageProps> = ({ src }) => {
  const imageClassName = component("avatar", "image")();

  return (
    <div
      className={imageClassName}
      role="img"
      style={{ backgroundImage: `url("${src}")` }}
    />
  );
};

const AvatarInitials: FC<IAvatarInitialsProps> = ({ initials }) => {
  const initialsClassName = component("avatar", "initials")();

  return <span className={initialsClassName}>{initials}</span>;
};