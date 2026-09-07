import React, {ComponentType, FC} from 'react';
import {classNames, component} from "@frontend-kit/utils";

import "./link.less";
import {ILinkProps, LinkSizeType} from "./link.types";
import {CaptionVariantTag, ParagraphVariantTag, Typography} from '../Typography';

export const Link: FC<ILinkProps> = ({
                         to,
                         onClick,
                         size = 'm',
                         icon,
                         iconPosition = 'left',
                         className = '',
                         children,
                         ...rest
                     }) => {
    const hasIcon = !!icon;

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (onClick) {
            event.preventDefault();
            onClick(to, event);
        }
    };

    const linkClassName = classNames(
        component("link")({
            [`size-${size}`]: true,
        }),
        className,
    )

    const linkIconClassName = component("link", "icon")();
    const contentClassName = component("link", "content")({ "icon-position-left": hasIcon && iconPosition === "left" });
    const linkLabelClassName = component("link", "label")();

    const {LinkLabel, tag} = linkLabel[size]

    const content = (
        <span className={contentClassName}>
            <LinkLabel tag={tag} as="span" className={linkLabelClassName}>
                {children}
            </LinkLabel>
            {hasIcon && (
                <span className={linkIconClassName} aria-hidden="true">{icon}</span>
                )
            }
        </span>
    );

    return (
        <a
            href={to}
            className={linkClassName}
            onClick={handleClick}
            {...rest}
        >
            {content}
        </a>
    );
}

const linkLabel: Record<
  LinkSizeType,
  {
    LinkLabel: ComponentType<any>;
    tag:
      | Extract<ParagraphVariantTag, "P4 REGULAR" | "P3 REGULAR">
      | Extract<CaptionVariantTag, "C1 REGULAR">;
  }
> = {
  s: { LinkLabel: Typography.Caption, tag: "C1 REGULAR" },
  m: { LinkLabel: Typography.Paragraph, tag: "P4 REGULAR" },
  l: { LinkLabel: Typography.Paragraph, tag: "P3 REGULAR" },
};
