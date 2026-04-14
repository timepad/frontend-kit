import type { Meta, StoryObj } from "@storybook/react";

import { Link } from "./Link";
import { LinkSizeType, IconPositionType } from "./link.types";
import { IconCheck16Outline } from "../../assets/icons";

const sizeOptions = ["s", "m", "l"] as const satisfies LinkSizeType[];
const iconPositionOptions = ["left", "right"] as const satisfies IconPositionType[];

const meta = {
    title: "Components/Link",
    component: Link,
    parameters: {
        layout: "centered",
        docs: {
            codePanel: true,
        },
    },
    tags: ["autodocs"],
    argTypes: {
        size: {
            description: `
Размер ссылки:

- **S** — 16px / 16px
- **M** — 20px / 20px (по умолчанию)
- **L** — 24px / 24px
`,
            control: "select",
            options: sizeOptions,
            table: {
                type: { summary: `"S" | "M" | "L"` },
                defaultValue: { summary: "M" },
            },
        },
        icon: {
            table: {
                disable: true,
            },
        },
        iconPosition: {
            description: `
Позиция иконки относительно текста.

- **left** — иконка слева (по умолчанию)
- **right** — иконка справа

Применяется только если передана \`icon\`.
      `,
            control: "select",
            options: iconPositionOptions,
            table: {
                type: { summary: `"left" | "right"` },
                defaultValue: { summary: "left" },
            },
        },
        to: {
            description: "URL ссылки.",
            control: "text",
            table: {
                type: { summary: "string" },
            },
        },
        children: {
            description: "Текстовое содержимое ссылки.",
            control: "text",
            table: {
                type: { summary: "ReactNode" },
            },
        },
        target: {
            description: `
Атрибут target ссылки.

- **\\_blank** — открыть в новой вкладке
- **\\_self** — открыть в текущей вкладке (по умолчанию)
      `,
            control: "select",
            options: ["_blank", "_self", "_parent", "_top"],
            table: {
                type: { summary: "string" },
            },
        },
        onClick: {
            description: "Колбэк при клике на ссылку.",
            action: "clicked",
            table: {
                type: { summary: "(e: MouseEvent) => void" },
            },
        },
        className: {
            table: {
                disable: true,
            },
        },
    },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

// Размер S
export const SizeS: Story = {
    args: {} as any,
    render: () => (
        <div style={{ display: "flex", gap: "32px", alignItems: "center", flexWrap: "wrap" }}>
            <Link to="#" size="s">
                Size S default
            </Link>
            <Link to="#" size="s" icon={<IconCheck16Outline />}>
                Icon left
            </Link>
            <Link to="#" size="s" icon={<IconCheck16Outline />} iconPosition="right">
                Icon right
            </Link>
        </div>
    ),
};

// Размер M
export const SizeM: Story = {
    args: {} as any,
    render: () => (
        <div style={{ display: "flex", gap: "32px", alignItems: "center", flexWrap: "wrap" }}>
            <Link to="#" size="m">
                Size M default
            </Link>
            <Link to="#" size="m" icon={<IconCheck16Outline />}>
                Icon left
            </Link>
            <Link to="#" size="m" icon={<IconCheck16Outline />} iconPosition="right">
                Icon right
            </Link>
        </div>
    ),
};

// Размер L
export const SizeL: Story = {
    args: {} as any,
    render: () => (
        <div style={{ display: "flex", gap: "32px", alignItems: "center", flexWrap: "wrap" }}>
            <Link to="#" size="l">
                Size L default
            </Link>
            <Link to="#" size="l" icon={<IconCheck16Outline />}>
                Icon left
            </Link>
            <Link to="#" size="l" icon={<IconCheck16Outline />} iconPosition="right">
                Icon right
            </Link>
        </div>
    ),
};