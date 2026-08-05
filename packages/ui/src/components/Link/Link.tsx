import React, {FC} from 'react';
import {classNames, component} from "@frontend-kit/utils";

import "./link.less";
import {ILinkProps} from "./link.types";
import {LinkLabel} from "./LinkLabel";

export const Link: FC<ILinkProps> = ({
                         to,
                         onClick,
                         target,
                         rel,
                         size = 'm',
                         icon,
                         iconPosition = 'left',
                         className = '',
                         children,
                         ...rest
                     }) => {
    const hasIcon = !!icon;

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (!onClick) return;
        event.preventDefault();
        onClick(to, event);
    };

    const linkClassName = classNames(
        component("link")({
            [`size-${size}`]: true,
        }),
        className,
    )

    const linkIconClassName = component("link", "icon")();
    const contentClassName = component("link", "content")({ "icon-position-left": hasIcon && iconPosition === "left" });

    const content = (
        <span className={contentClassName}>
            <LinkLabel size={size}>{children}</LinkLabel>
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
            target={target}
            rel={target === '_blank' ? rel ?? 'noopener noreferrer' : rel}
            onClick={handleClick}
            {...rest}
        >
            {content}
        </a>
    );
}
