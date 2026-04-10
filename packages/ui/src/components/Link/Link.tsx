import React, {useState} from 'react';
import {ILinkProps} from "./link.types";
import "./link.less";
import {classNames, component} from "@frontend-kit/utils";

export function Link({
                         to,
                         external = false,
                         navigate,
                         onClick,
                         target,
                         rel,
                         size = 'M',
                         icon,
                         iconPosition = 'left',
                         state = 'default',
                         className = '',
                         children,
                         ...rest
                     }: ILinkProps) {
    const [isHovered, setIsHovered] = useState(false);

    const currentState = state === 'hover' || isHovered ? 'hover' : 'default';

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
            [`state-${currentState}`]: true,
        }),
        className,
    )

    const contentClassName = component("link", "content")({ "icon-position-left": hasIcon && iconPosition === "left" });

    const content = (
        <span className={contentClassName}>
            <span className={component("link", "text")()}>{children}</span>
            {hasIcon && (
                <span className={component("link", "icon")()}>{icon}</span>
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
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
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
