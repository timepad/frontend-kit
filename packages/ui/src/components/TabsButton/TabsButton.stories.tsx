import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";

import { TabsButton } from "./TabsButton";
import {
  ITabsButtonProps,
  ITabsButtonListProps,
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
  { tabId: "overview", label: "Обзор" },
  { tabId: "tickets", label: "Билеты" },
  { tabId: "stats", label: "Статистика" },
  { tabId: "guests", label: "Гости" },
  { tabId: "program", label: "Программа" },
  { tabId: "speakers", label: "Спикеры" },
  { tabId: "partners", label: "Партнёры" },
  { tabId: "reviews", label: "Отзывы" },
] as const;

type TabsButtonStoryArgs = ITabsButtonProps & Pick<ITabsButtonListProps, "overflow">;

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
Свойство TabsButton.List: как табы ведут себя, если не помещаются в контейнер.

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
    activeTabId: {
      table: { disable: true },
    },
    defaultActiveTabId: {
      table: { disable: true },
    },
    onActiveTabChange: {
      table: { disable: true },
    },
  },
} satisfies Meta<TabsButtonStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

const PanelBody = ({ title, text }: { title: string; text: string }) => (
  <div>
    <Typography.Paragraph tag="P3 BOLD">{title}</Typography.Paragraph>
    <Typography.Paragraph tag="P4 REGULAR">{text}</Typography.Paragraph>
  </div>
);

const UncontrolledTabs = ({ overflow, ...args }: TabsButtonStoryArgs) => (
  <TabsButton {...args} defaultActiveTabId={args.defaultActiveTabId ?? "overview"}>
    <TabsButton.List overflow={overflow} aria-label="Разделы события">
      <TabsButton.Tab tabId="overview" label="Обзор" />
      <TabsButton.Tab tabId="tickets" label="Билеты" />
      <TabsButton.Tab tabId="stats" label="Статистика" />
    </TabsButton.List>
    <TabsButton.Panel tabId="overview">
      <PanelBody
        title="Обзор"
        text="Короткое описание события, площадка и расписание."
      />
    </TabsButton.Panel>
    <TabsButton.Panel tabId="tickets">
      <PanelBody
        title="Билеты"
        text="Категории билетов, цены и доступные квоты."
      />
    </TabsButton.Panel>
    <TabsButton.Panel tabId="stats">
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
    defaultActiveTabId: "overview",
  },
  render: (args) => <UncontrolledTabs {...args} />,
};

export const Controlled: Story = {
  args: {
    size: "m",
    activeTabId: "tickets",
  },
  render: function ControlledRender({ overflow, ...args }) {
    const [, updateArgs] = useArgs<ITabsButtonProps>();

    return (
      <TabsButton
        {...args}
        activeTabId={args.activeTabId}
        onActiveTabChange={(nextTabId) => updateArgs({ activeTabId: nextTabId })}
      >
        <TabsButton.List overflow={overflow} aria-label="Разделы события">
          <TabsButton.Tab tabId="overview" label="Обзор" />
          <TabsButton.Tab tabId="tickets" label="Билеты" />
          <TabsButton.Tab tabId="stats" label="Статистика" />
        </TabsButton.List>
        <TabsButton.Panel tabId="overview">
          <PanelBody title="Обзор" text="Контролируемый режим: состояние снаружи." />
        </TabsButton.Panel>
        <TabsButton.Panel tabId="tickets">
          <PanelBody title="Билеты" text="Смена таба обновляет activeTabId через onActiveTabChange." />
        </TabsButton.Panel>
        <TabsButton.Panel tabId="stats">
          <PanelBody title="Статистика" text="Панель статистики." />
        </TabsButton.Panel>
      </TabsButton>
    );
  },
};

export const CounterBadge: Story = {
  args: {
    size: "m",
    defaultActiveTabId: "tickets",
  },
  render: ({ overflow, ...args }) => (
    <TabsButton {...args} defaultActiveTabId={args.defaultActiveTabId ?? "tickets"}>
      <TabsButton.List overflow={overflow} aria-label="Разделы события">
        <TabsButton.Tab tabId="overview" label="Обзор" />
        <TabsButton.Tab tabId="tickets" label="Билеты" counter={1} />
        <TabsButton.Tab tabId="stats" label="Статистика" counter={100} />
      </TabsButton.List>
      <TabsButton.Panel tabId="overview">
        <PanelBody title="Обзор" text="Таб без бейджа." />
      </TabsButton.Panel>
      <TabsButton.Panel tabId="tickets">
        <PanelBody
          title="Билеты"
          text="Числовой бейдж. Значения больше 99 отображаются как 99+."
        />
      </TabsButton.Panel>
      <TabsButton.Panel tabId="stats">
        <PanelBody title="Статистика" text="Бейдж 99+." />
      </TabsButton.Panel>
    </TabsButton>
  ),
};

export const Notify: Story = {
  args: {
    size: "m",
    defaultActiveTabId: "tickets",
  },
  render: ({ overflow, ...args }) => (
    <TabsButton {...args} defaultActiveTabId={args.defaultActiveTabId ?? "tickets"}>
      <TabsButton.List overflow={overflow} aria-label="Разделы события">
        <TabsButton.Tab tabId="overview" label="Обзор" />
        <TabsButton.Tab tabId="tickets" label="Билеты" notify />
        <TabsButton.Tab tabId="stats" label="Статистика" />
      </TabsButton.List>
      <TabsButton.Panel tabId="overview">
        <PanelBody title="Обзор" text="Таб без индикатора." />
      </TabsButton.Panel>
      <TabsButton.Panel tabId="tickets">
        <PanelBody title="Билеты" text="Точка непрочитанного уведомления." />
      </TabsButton.Panel>
      <TabsButton.Panel tabId="stats">
        <PanelBody title="Статистика" text="Таб без индикатора." />
      </TabsButton.Panel>
    </TabsButton>
  ),
};

export const DisabledTab: Story = {
  args: {
    size: "m",
    defaultActiveTabId: "overview",
  },
  render: ({ overflow, ...args }) => (
    <TabsButton {...args} defaultActiveTabId={args.defaultActiveTabId ?? "overview"}>
      <TabsButton.List overflow={overflow} aria-label="Разделы события">
        <TabsButton.Tab tabId="overview" label="Обзор" />
        <TabsButton.Tab tabId="tickets" label="Билеты" />
        <TabsButton.Tab tabId="stats" label="Статистика" disabled />
      </TabsButton.List>
      <TabsButton.Panel tabId="overview">
        <PanelBody title="Обзор" text="Недоступный таб нельзя выбрать." />
      </TabsButton.Panel>
      <TabsButton.Panel tabId="tickets">
        <PanelBody title="Билеты" text="Категории билетов." />
      </TabsButton.Panel>
      <TabsButton.Panel tabId="stats">
        <PanelBody title="Статистика" text="Эта панель недоступна." />
      </TabsButton.Panel>
    </TabsButton>
  ),
};

export const Wrap: Story = {
  args: {
    size: "m",
    overflow: "wrap",
    defaultActiveTabId: "overview",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
  render: ({ overflow, ...args }) => (
    <TabsButton {...args} defaultActiveTabId={args.defaultActiveTabId ?? "overview"}>
      <TabsButton.List overflow={overflow} aria-label="Разделы события">
        {manyTabs.map((tab) => (
          <TabsButton.Tab key={tab.tabId} tabId={tab.tabId} label={tab.label} />
        ))}
      </TabsButton.List>
      {manyTabs.map((tab) => (
        <TabsButton.Panel key={tab.tabId} tabId={tab.tabId}>
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
    defaultActiveTabId: "reviews",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
  render: ({ overflow, ...args }) => (
    <TabsButton {...args} defaultActiveTabId={args.defaultActiveTabId ?? "reviews"}>
      <TabsButton.List overflow={overflow} aria-label="Разделы события">
        {manyTabs.map((tab) => (
          <TabsButton.Tab key={tab.tabId} tabId={tab.tabId} label={tab.label} />
        ))}
      </TabsButton.List>
      {manyTabs.map((tab) => (
        <TabsButton.Panel key={tab.tabId} tabId={tab.tabId}>
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
  render: function SizesRender({ overflow }) {
    const [activeTabId, setActiveTabId] = useState("overview");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {sizeOptions.map((size) => (
          <TabsButton
            key={size}
            size={size}
            activeTabId={activeTabId}
            onActiveTabChange={setActiveTabId}
          >
            <TabsButton.List overflow={overflow} aria-label={`Размер ${size}`}>
              <TabsButton.Tab tabId="overview" label="Обзор" />
              <TabsButton.Tab tabId="tickets" label="Билеты" />
              <TabsButton.Tab tabId="stats" label="Статистика" />
            </TabsButton.List>
          </TabsButton>
        ))}
        <PanelBody
          title={activeTabId}
          text="Один и тот же выбранный таб во всех размерах."
        />
      </div>
    );
  },
};
