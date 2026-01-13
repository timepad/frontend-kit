import type { Meta, StoryObj } from "@storybook/react";

import { TertiaryBanner } from "./TertiaryBanner";
import {Modifier} from "./tertiary-banner.types";

const modifierOptions = ["base", "inverted"] as const satisfies Modifier[];

const meta = {
    title: "Components/TertiaryBanner",
    component: TertiaryBanner,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        modifier: {
            control: "select",
            options: modifierOptions,
            description: "Модификатор стиля",
        },
        children: {
            control: "text",
            description: "Текст баннера",
        },
        variant: {
            table: {
                disable: true,
            },
        },
        icon: {
            table: {
                disable: true,
            },
        },
    },
} satisfies Meta<typeof TertiaryBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

// Info
export const InfoBase: Story = {
    render: (args) => (
        <TertiaryBanner.Info modifier={args.modifier}>
            {args.children}
        </TertiaryBanner.Info>
    ),
    args: {
        modifier: "base",
        children: "Banner info. Светлая тема.",
    },
};

export const InfoInverted: Story = {
    render: (args) => (
        <TertiaryBanner.Info modifier={args.modifier}>
            {args.children}
        </TertiaryBanner.Info>
    ),
    args: {
        modifier: "inverted",
        children: "Banner info. Темная тема.",
    },
};

// Warning
export const WarningBase: Story = {
    render: (args) => (
        <TertiaryBanner.Warning modifier={args.modifier}>
            {args.children}
        </TertiaryBanner.Warning>
    ),
    args: {
        modifier: "base",
        children: "Banner Warning. Светлая тема.",
    },
};

export const WarningInverted: Story = {
    render: (args) => (
        <TertiaryBanner.Warning modifier={args.modifier}>
            {args.children}
        </TertiaryBanner.Warning>
    ),
    args: {
        modifier: "inverted",
        children: "Banner Warning. Темная тема.",
    },
};

// Error
export const ErrorBase: Story = {
    render: (args) => (
        <TertiaryBanner.Error modifier={args.modifier}>
            {args.children}
        </TertiaryBanner.Error>
    ),
    args: {
        modifier: "base",
        children: "Banner Error. Светлая тема.",
    },
};

export const ErrorInverted: Story = {
    render: (args) => (
        <TertiaryBanner.Error modifier={args.modifier}>
            {args.children}
        </TertiaryBanner.Error>
    ),
    args: {
        modifier: "inverted",
        children: "Banner Error. Темная тема.",
    },
};

// Success
export const SuccessBase: Story = {
    render: (args) => (
        <TertiaryBanner.Success modifier={args.modifier}>
            {args.children}
        </TertiaryBanner.Success>
    ),
    args: {
        modifier: "base",
        children: "Banner Success. Светлая тема.",
    },
};

export const SuccessInverted: Story = {
    render: (args) => (
        <TertiaryBanner.Success modifier={args.modifier}>
            {args.children}
        </TertiaryBanner.Success>
    ),
    args: {
        modifier: "inverted",
        children: "Banner Success. Темная тема.",
    },
};
