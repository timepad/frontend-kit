import React, {FC} from 'react';
import {classNames, component} from "@frontend-kit/utils";

import "./link.less";
import {ILinkProps, LinkSizeType} from "./link.types";
import {createTypographyComponent, Typography} from '../Typography';

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

    const {LabelComponent} = linkLabel[size]

    const content = (
        <span className={contentClassName}>
            <LabelComponent as="span" className={linkLabelClassName}>
                {children}
            </LabelComponent>
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
  {LabelComponent: ReturnType<typeof createTypographyComponent>}
> = {
  s: {
    LabelComponent: createTypographyComponent(Typography.Caption, "C1 REGULAR"),
  },
  m: {
    LabelComponent: createTypographyComponent(Typography.Paragraph, "P4 REGULAR"),
  },
  l: {
    LabelComponent: createTypographyComponent(Typography.Paragraph, "P3 REGULAR"),
  },
};
