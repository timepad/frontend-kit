import { HTMLAttributes, ReactElement, SVGProps } from "react";

export type AvatarSize = 24 | 32 | 40 | 48 | 64 | 80;
export type SmallAvatarSize = Extract<AvatarSize, 24 | 32>;

interface IAvatarBaseProps extends HTMLAttributes<HTMLDivElement> {
  text?: string;
  stroke?: boolean;
  image?: string;
  avatarStatusClassName?: string;
}

export type IAvatarProps =
    | (IAvatarBaseProps & { size?: SmallAvatarSize; icon?: never })
    | (IAvatarBaseProps & { size?: Exclude<AvatarSize, SmallAvatarSize>; icon?: ReactElement<SVGProps<SVGSVGElement>> });
