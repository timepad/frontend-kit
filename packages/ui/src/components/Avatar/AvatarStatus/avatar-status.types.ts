import { HTMLAttributes, ReactElement, SVGProps } from "react";

export type AvatarStatusSize = "s" | "m" | "l";

interface IBaseAvatarStatusProps extends HTMLAttributes<HTMLDivElement> {
  size?: AvatarStatusSize;
  icon: ReactElement<SVGProps<SVGSVGElement>>;
}

// appearance = "accent"
interface IAccentAvatarStatusProps extends IBaseAvatarStatusProps {
  appearance?: "accent";
}

// appearance = "custom"
interface ICustomAvatarStatusProps extends IBaseAvatarStatusProps {
  appearance: "custom";
  color: string;
}

export type IAvatarStatusProps = IAccentAvatarStatusProps | ICustomAvatarStatusProps;