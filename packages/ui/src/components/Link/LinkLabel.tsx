import React, {FC} from "react";
import {component} from "@frontend-kit/utils";

import "./link.less";
import {Typography} from "../Typography";
import {ILinkTextProps} from "./link.types";

export const LinkLabel: FC<ILinkTextProps> = ({ size, children }) => {
    const linkTextClassName = component("link", "text")();

    if (size === 'm') {
        return (
            <Typography.Paragraph
                tag="P4 REGULAR"
                as="span"
                className={linkTextClassName}
            >
                {children}
            </Typography.Paragraph>
        );
    }

    if (size === 'l') {
        return (
            <Typography.Paragraph
                tag="P3 REGULAR"
                as="span"
                className={linkTextClassName}
            >
                {children}
            </Typography.Paragraph>
        );
    }

    // size === 's'
    return (
        <Typography.Caption
            tag="C1 REGULAR"
            as="span"
            className={linkTextClassName}
        >
            {children}
        </Typography.Caption>
    );
};
