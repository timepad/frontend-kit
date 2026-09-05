import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";

import { TabsButton } from "./TabsButton";
import {
  ITabsButtonProps,
  TabsButtonOverflow,
  TabsButtonSize,
} from "./tabs-button.types";
import { Typography } from "../Typography";

const sizeOptions = ["s", "m", "l"] as const satisfies TabsButtonSize[];
const overflowOptions = [
  "scroll",
  "wrap",
] as const satisfies TabsButtonOverflow[];

const manyTabs = [
  { value: "overview", label: "Обзор" },
  { value: "tickets", label: "Билеты" },
  { value: "stats", label: "Статистика" },
  { value: "guests", label: "Гости" },
  { value: "program", label: "Программа" },
  { value: "speakers", label: "Спикеры" },
  { value: "partners", label: "Партнёры" },
  { value: "reviews", label: "Отзывы" },
] as const;

const meta = {
  title: "Components/TabsButton",
  component: TabsButton,
  subcomponents: {
    "TabsButton.List": TabsButton.List,
    "TabsButton.Tab": TabsButton.Tab,
    "TabsButton.Panel": TabsButton.Panel,
  },
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      description: `
Размер сегментированных табов.

- **s** — компактный
- **m** — стандартный
- **l** — крупный
      `,
      control: "select",
      options: sizeOptions,
      table: {
        type: { summary: sizeOptions.join(" | ") },
        defaultValue: { summary: "m" },
      },
    },
    overflow: {
      description: `
Как табы ведут себя, если не помещаются в контейнер.

- **scroll** — одна строка с горизонтальным скроллом, активный таб доскролливается в видимую область (по умолчанию)
- **wrap** — перенос на следующую строку
      `,
      control: "inline-radio",
      options: overflowOptions,
      table: {
        type: { summary: overflowOptions.join(" | ") },
        defaultValue: { summary: "scroll" },
      },
    },
    value: {
      table: { disable: true },
    },
    defaultValue: {
      table: { disable: true },
    },
    onValueChange: {
      table: { disable: true },
    },
  },
} satisfies Meta<typeof TabsButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const PanelBody = ({ title, text }: { title: string; text: string }) => (
  <div>
    <Typography.Paragraph tag="P3 BOLD">{title}</Typography.Paragraph>
    <Typography.Paragraph tag="P4 REGULAR">{text}</Typography.Paragraph>
  </div>
);

const UncontrolledTabs = (args: ITabsButtonProps) => (
  <TabsButton {...args} defaultValue={args.defaultValue ?? "overview"}>
    <TabsButton.List aria-label="Разделы события">
      <TabsButton.Tab value="overview" label="Обзор" />
      <TabsButton.Tab value="tickets" label="Билеты" />
      <TabsButton.Tab value="stats" label="Статистика" />
    </TabsButton.List>
    <TabsButton.Panel value="overview">
      <PanelBody
        title="Обзор"
        text="Короткое описание события, площадка и расписание."
      />
    </TabsButton.Panel>
    <TabsButton.Panel value="tickets">
      <PanelBody
        title="Билеты"
        text="Категории билетов, цены и доступные квоты."
      />
    </TabsButton.Panel>
    <TabsButton.Panel value="stats">
      <PanelBody
        title="Статистика"
        text="Продажи, возвраты и динамика регистраций."
      />
    </TabsButton.Panel>
  </TabsButton>
);

export const Default: Story = {
  args: {
    size: "m",
    overflow: "scroll",
    defaultValue: "overview",
  },
  render: (args) => <UncontrolledTabs {...args} />,
};

export const Controlled: Story = {
  args: {
    size: "m",
    value: "tickets",
  },
  render: function ControlledRender(args) {
    const [, updateArgs] = useArgs<ITabsButtonProps>();

    return (
      <TabsButton
        {...args}
        value={args.value}
        onValueChange={(nextValue) => updateArgs({ value: nextValue })}
      >
        <TabsButton.List aria-label="Разделы события">
          <TabsButton.Tab value="overview" label="Обзор" />
          <TabsButton.Tab value="tickets" label="Билеты" />
          <TabsButton.Tab value="stats" label="Статистика" />
        </TabsButton.List>
        <TabsButton.Panel value="overview">
          <PanelBody title="Обзор" text="Контролируемый режим: состояние снаружи." />
        </TabsButton.Panel>
        <TabsButton.Panel value="tickets">
          <PanelBody title="Билеты" text="Смена таба обновляет value через onValueChange." />
        </TabsButton.Panel>
        <TabsButton.Panel value="stats">
          <PanelBody title="Статистика" text="Панель статистики." />
        </TabsButton.Panel>
      </TabsButton>
    );
  },
};

export const CounterBadge: Story = {
  args: {
    size: "m",
    defaultValue: "tickets",
  },
  render: (args) => (
    <TabsButton {...args} defaultValue={args.defaultValue ?? "tickets"}>
      <TabsButton.List aria-label="Разделы события">
        <TabsButton.Tab value="overview" label="Обзор" />
        <TabsButton.Tab value="tickets" label="Билеты" counter={1} />
        <TabsButton.Tab value="stats" label="Статистика" counter={100} />
      </TabsButton.List>
      <TabsButton.Panel value="overview">
        <PanelBody title="Обзор" text="Таб без бейджа." />
      </TabsButton.Panel>
      <TabsButton.Panel value="tickets">
        <PanelBody
          title="Билеты"
          text="Числовой бейдж. Значения больше 99 отображаются как 99+."
        />
      </TabsButton.Panel>
      <TabsButton.Panel value="stats">
        <PanelBody title="Статистика" text="Бейдж 99+." />
      </TabsButton.Panel>
    </TabsButton>
  ),
};

export const Notify: Story = {
  args: {
    size: "m",
    defaultValue: "tickets",
  },
  render: (args) => (
    <TabsButton {...args} defaultValue={args.defaultValue ?? "tickets"}>
      <TabsButton.List aria-label="Разделы события">
        <TabsButton.Tab value="overview" label="Обзор" />
        <TabsButton.Tab value="tickets" label="Билеты" notify />
        <TabsButton.Tab value="stats" label="Статистика" />
      </TabsButton.List>
      <TabsButton.Panel value="overview">
        <PanelBody title="Обзор" text="Таб без индикатора." />
      </TabsButton.Panel>
      <TabsButton.Panel value="tickets">
        <PanelBody title="Билеты" text="Точка непрочитанного уведомления." />
      </TabsButton.Panel>
      <TabsButton.Panel value="stats">
        <PanelBody title="Статистика" text="Таб без индикатора." />
      </TabsButton.Panel>
    </TabsButton>
  ),
};

export const DisabledTab: Story = {
  args: {
    size: "m",
    defaultValue: "overview",
  },
  render: (args) => (
    <TabsButton {...args} defaultValue={args.defaultValue ?? "overview"}>
      <TabsButton.List aria-label="Разделы события">
        <TabsButton.Tab value="overview" label="Обзор" />
        <TabsButton.Tab value="tickets" label="Билеты" />
        <TabsButton.Tab value="stats" label="Статистика" disabled />
      </TabsButton.List>
      <TabsButton.Panel value="overview">
        <PanelBody title="Обзор" text="Недоступный таб нельзя выбрать." />
      </TabsButton.Panel>
      <TabsButton.Panel value="tickets">
        <PanelBody title="Билеты" text="Категории билетов." />
      </TabsButton.Panel>
      <TabsButton.Panel value="stats">
        <PanelBody title="Статистика" text="Эта панель недоступна." />
      </TabsButton.Panel>
    </TabsButton>
  ),
};

export const Wrap: Story = {
  args: {
    size: "m",
    overflow: "wrap",
    defaultValue: "overview",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <TabsButton {...args} defaultValue={args.defaultValue ?? "overview"}>
      <TabsButton.List aria-label="Разделы события">
        {manyTabs.map((tab) => (
          <TabsButton.Tab key={tab.value} value={tab.value} label={tab.label} />
        ))}
      </TabsButton.List>
      {manyTabs.map((tab) => (
        <TabsButton.Panel key={tab.value} value={tab.value}>
          <PanelBody
            title={tab.label}
            text="Табы переносятся на следующую строку, если не помещаются."
          />
        </TabsButton.Panel>
      ))}
    </TabsButton>
  ),
};

export const Scroll: Story = {
  args: {
    size: "m",
    overflow: "scroll",
    defaultValue: "reviews",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <TabsButton {...args} defaultValue={args.defaultValue ?? "reviews"}>
      <TabsButton.List aria-label="Разделы события">
        {manyTabs.map((tab) => (
          <TabsButton.Tab key={tab.value} value={tab.value} label={tab.label} />
        ))}
      </TabsButton.List>
      {manyTabs.map((tab) => (
        <TabsButton.Panel key={tab.value} value={tab.value}>
          <PanelBody
            title={tab.label}
            text="Одна строка со скроллом: активный таб доскролливается, чтобы быть виден целиком."
          />
        </TabsButton.Panel>
      ))}
    </TabsButton>
  ),
};

export const Sizes: Story = {
  argTypes: {
    size: { table: { disable: true } },
  },
  render: function SizesRender() {
    const [value, setValue] = useState("overview");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {sizeOptions.map((size) => (
          <TabsButton
            key={size}
            size={size}
            value={value}
            onValueChange={setValue}
          >
            <TabsButton.List aria-label={`Размер ${size}`}>
              <TabsButton.Tab value="overview" label="Обзор" />
              <TabsButton.Tab value="tickets" label="Билеты" />
              <TabsButton.Tab value="stats" label="Статистика" />
            </TabsButton.List>
          </TabsButton>
        ))}
        <PanelBody
          title={value}
          text="Один и тот же выбранный таб во всех размерах."
        />
      </div>
    );
  },
};
