import { HTMLAttributes, ReactNode } from "react";
import { AvatarStatusSize } from "./AvatarStatus/avatar-status.types";

export type AvatarSize = 24 | 32 | 40 | 48 | 64 | 80;
export type SmallAvatarSize = Extract<AvatarSize, 24 | 32>;
export type AvatarSizeWithStatus = Exclude<AvatarSize, SmallAvatarSize>;

interface IAvatarBaseProps extends HTMLAttributes<HTMLDivElement> {
  text?: string;
  stroke?: boolean;
  image?: string;
}

interface IAvatarStatusRendererProps {
  statusSize: AvatarStatusSize;
}

interface IAvatarWithStatusProps {
  renderAvatarStatus?: (props: IAvatarStatusRendererProps) => ReactNode;
}

export type IAvatarProps =
  | (IAvatarBaseProps & { size?: SmallAvatarSize; renderAvatarStatus?: never })
  | (IAvatarBaseProps & { size?: Exclude<AvatarSize, SmallAvatarSize> } & IAvatarWithStatusProps);
