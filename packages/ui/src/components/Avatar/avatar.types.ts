import { HTMLAttributes, ReactElement, SVGProps } from "react";

export type AvatarSize = 24 | 32 | 40 | 48 | 64 | 80;
export type SmallAvatarSize = 24 | 32;

interface IAvatarBaseProps extends HTMLAttributes<HTMLDivElement> {
  name?: string;
  stroke?: boolean;
  src?: string;
  avatarStatusClassName?: string;
}

export type IAvatarProps =
    | (IAvatarBaseProps & { size?: SmallAvatarSize; icon?: never })
    | (IAvatarBaseProps & { size?: Exclude<AvatarSize, SmallAvatarSize>; icon?: ReactElement<SVGProps<SVGSVGElement>> });

export interface IAvatarInitialsProps {
  initials: string;
}

export interface IAvatarImageProps {
  src: string;
}
