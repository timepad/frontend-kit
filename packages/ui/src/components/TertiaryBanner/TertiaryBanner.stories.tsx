import type { Meta, StoryObj } from "@storybook/react";

import { TertiaryBanner } from "./TertiaryBanner";
import { TertiaryBannerVariant } from "./tertiary-banner.types";

const variantOptions = ["base", "inverted"] as const satisfies TertiaryBannerVariant[];

const meta = {
    title: "Components/TertiaryBanner",
    component: TertiaryBanner,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: variantOptions,
            description: "Выбор темы баннера",
        },
        children: {
            control: "text",
            description: "Текст баннера",
        },
    },
} satisfies Meta<typeof TertiaryBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

// Info
export const InfoBase: Story = {
    render: (args) => (
        <TertiaryBanner.Info variant={args.variant}>
            {args.children}
        </TertiaryBanner.Info>
    ),
    args: {
        variant: "base",
        children: "Banner info. Светлая тема.",
    },
};

export const InfoInverted: Story = {
    render: (args) => (
        <TertiaryBanner.Info variant={args.variant}>
            {args.children}
        </TertiaryBanner.Info>
    ),
    args: {
        variant: "inverted",
        children: "Banner info. Темная тема.",
    },
};

// Warning
export const WarningBase: Story = {
    render: (args) => (
        <TertiaryBanner.Warning variant={args.variant}>
            {args.children}
        </TertiaryBanner.Warning>
    ),
    args: {
        variant: "base",
        children: "Banner Warning. Светлая тема.",
    },
};

export const WarningInverted: Story = {
    render: (args) => (
        <TertiaryBanner.Warning variant={args.variant}>
            {args.children}
        </TertiaryBanner.Warning>
    ),
    args: {
        variant: "inverted",
        children: "Banner Warning. Темная тема.",
    },
};

// Error
export const ErrorBase: Story = {
    render: (args) => (
        <TertiaryBanner.Error variant={args.variant}>
            {args.children}
        </TertiaryBanner.Error>
    ),
    args: {
        variant: "base",
        children: "Banner Error. Светлая тема.",
    },
};

export const ErrorInverted: Story = {
    render: (args) => (
        <TertiaryBanner.Error variant={args.variant}>
            {args.children}
        </TertiaryBanner.Error>
    ),
    args: {
        variant: "inverted",
        children: "Banner Error. Темная тема.",
    },
};

// Success
export const SuccessBase: Story = {
    render: (args) => (
        <TertiaryBanner.Success variant={args.variant}>
            {args.children}
        </TertiaryBanner.Success>
    ),
    args: {
        variant: "base",
        children: "Banner Success. Светлая тема.",
    },
};

export const SuccessInverted: Story = {
    render: (args) => (
        <TertiaryBanner.Success variant={args.variant}>
            {args.children}
        </TertiaryBanner.Success>
    ),
    args: {
        variant: "inverted",
        children: "Banner Success. Темная тема.",
    },
};
