import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import {
  IconHeart24Outline,
  IconInfoHexagon24Outline,
  IconQuestionCircle24Outline,
  IconShow24Outline,
  IconUser24Outline,
} from "../../assets/icons";
import { Tabbar } from "./Tabbar";

const meta = {
  title: "Components/Tabbar",
  component: Tabbar,
  parameters: {
    layout: "centered",
    docs: { codePanel: true },
  },
  tags: ["autodocs"],
  args: {
    children: null,
    shadow: true,
    showLabels: true,
  },
  argTypes: {
    backgroundColor: { control: "color" },
    children: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 430, paddingTop: 32, background: "var(--bg-secondary)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tabbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { label: "Главная", icon: <IconInfoHexagon24Outline /> },
  { label: "Избранное", icon: <IconHeart24Outline /> },
  { label: "События", icon: <IconShow24Outline /> },
  { label: "Помощь", icon: <IconQuestionCircle24Outline /> },
  { label: "Профиль", icon: <IconUser24Outline /> },
];

type NotificationVariant = "counter" | "notify" | "none";

const getNotificationProps = (
  variant: NotificationVariant,
  index: number,
) => {
  if (variant === "counter" && index === 1) return { counter: 1 } as const;
  if (variant === "counter" && index === 3) return { counter: 100 } as const;
  if (variant === "notify" && index === 2) return { notify: true } as const;
  return {};
};

const TabbarDemo = ({
  backgroundColor,
  count = 5,
  notificationVariant = "counter",
  shadow = true,
  showLabels = true,
}: {
  backgroundColor?: string;
  count?: number;
  notificationVariant?: NotificationVariant;
  shadow?: boolean;
  showLabels?: boolean;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Tabbar
      backgroundColor={backgroundColor}
      shadow={shadow}
      showLabels={showLabels}
    >
      {items.slice(0, count).map(({ label, icon }, index) => (
        <Tabbar.Tab
          active={activeIndex === index}
          icon={icon}
          key={label}
          label={label}
          onClick={() => setActiveIndex(index)}
          {...getNotificationProps(notificationVariant, index)}
        />
      ))}
    </Tabbar>
  );
};

export const Playground: Story = {
  render: ({ backgroundColor, shadow, showLabels }) => (
    <TabbarDemo
      backgroundColor={backgroundColor}
      shadow={shadow}
      showLabels={showLabels}
    />
  ),
};

export const CustomBackground: Story = {
  render: () => <TabbarDemo backgroundColor="#F0F3FF" />,
};

export const Notify: Story = {
  render: () => <TabbarDemo notificationVariant="notify" />,
};

export const Links: Story = {
  render: () => (
    <Tabbar>
      {items.map(({ label, icon }, index) => (
        <Tabbar.Tab
          active={index === 0}
          as="a"
          href={`#${label.toLowerCase()}`}
          icon={icon}
          key={label}
          label={label}
          {...getNotificationProps("counter", index)}
        />
      ))}
    </Tabbar>
  ),
};

export const ThreeTabs: Story = {
  render: () => <TabbarDemo count={3} notificationVariant="none" />,
};

export const WithoutLabels: Story = {
  render: () => <TabbarDemo showLabels={false} />,
};

export const WithoutShadow: Story = {
  render: () => <TabbarDemo shadow={false} />,
};
