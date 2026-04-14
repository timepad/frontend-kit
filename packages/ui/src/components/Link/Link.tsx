import React, {FC} from 'react';
import {classNames, component} from "@frontend-kit/utils";

import "./link.less";
import {ILinkProps} from "./link.types";
import {LinkLabel} from "./LinkLabel";

export const Link: FC<ILinkProps> = ({
                         to,
                         external = false,
                         navigate,
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
        onClick?.(event);

        if (event.defaultPrevented) return;
        if (external) return;
        if (event.button !== 0 || isModifiedEvent(event) || target === '_blank' || rest.download)  return;

        if (navigate) {
            event.preventDefault();
            navigate(to, event);
        }
    };

    // clink clink--size-S clink--state-hover
    const linkClassName = classNames(
        component("link")({
            [`size-${size}`]: true,
        }),
        className,
    )

    const content = (
        <span className={component("link", "content")({ "icon-position-left": hasIcon && iconPosition === "left" })}>
            <LinkLabel size={size}>{children}</LinkLabel>
            {hasIcon && (
                <span className={component("link", "icon")()} aria-hidden="true">{icon}</span>
                )
            }
        </span>
    );

    return (
        <a
            href={to}
            className={linkClassName}
            target={target}
            rel={external && target === '_blank' ? rel ?? 'noopener noreferrer' : rel}
            onClick={handleClick}
            {...rest}
        >
            {content}
        </a>
    );
}

function isModifiedEvent(event: React.MouseEvent<HTMLAnchorElement>) {
    return event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
}
