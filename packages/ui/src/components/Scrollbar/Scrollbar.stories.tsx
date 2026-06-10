import type { Meta, StoryObj } from "@storybook/react";

import { Scrollbar } from "./Scrollbar";
import type { IScrollbarProps, ScrollbarFlow } from "./scrollbar.types";

type PlaygroundFlow = ScrollbarFlow | "both";

const flowOptions = ["vertical", "horizontal", "both"] as const satisfies readonly PlaygroundFlow[];

const meta = {
  title: "Components/Scrollbar",
  component: Scrollbar,
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
      description: {
        component:
          "Внешний вид для полосы прокрутки. Без `flow` скролл работает в обоих направлениях. `flow` ограничивает направление.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    flow: { control: "select", options: [...flowOptions] },
  },
  args: {
    flow: "vertical",
  },
} satisfies Meta<Omit<IScrollbarProps, "flow"> & { flow: PlaygroundFlow }>;

export default meta;

type Story = StoryObj<typeof meta>;

const verticalContent = (
  <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 16 }}>
    {Array.from({ length: 20 }, (_, index) => (
      <div
        key={index}
        style={{
          padding: "12px 16px",
          borderRadius: 8,
          background: "var(--bg-secondary)",
          color: "var(--text-secondary)",
        }}
      >
        Элемент списка {index + 1}
      </div>
    ))}
  </div>
);

const horizontalContent = (
  <div style={{ display: "flex", gap: 12, padding: 16, width: "max-content" }}>
    {Array.from({ length: 20 }, (_, index) => (
      <div
        key={index}
        style={{
          flexShrink: 0,
          width: 160,
          padding: "12px 16px",
          borderRadius: 8,
          background: "var(--bg-secondary)",
          color: "var(--text-secondary)",
        }}
      >
        Колонка {index + 1}
      </div>
    ))}
  </div>
);

const bothContent = (
  <div style={{ padding: 16, width: "max-content" }}>
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {Array.from({ length: 20 }, (_, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex", gap: 12 }}>
          {Array.from({ length: 8 }, (_, colIndex) => (
            <div
              key={colIndex}
              style={{
                flexShrink: 0,
                width: 120,
                padding: "12px 16px",
                borderRadius: 8,
                background: "var(--bg-secondary)",
                color: "var(--text-secondary)",
              }}
            >
              {rowIndex + 1}:{colIndex + 1}
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

const containerStyle = { border: "1px dashed var(--bg-stroke)" } as const;

export const Playground: Story = {
  render: ({ flow }) => {
    const playgroundFlow = flow as PlaygroundFlow;

    if (playgroundFlow === "horizontal") {
      return (
        <Scrollbar flow="horizontal" style={{ ...containerStyle, width: 400 }}>
          {horizontalContent}
        </Scrollbar>
      );
    }

    if (playgroundFlow === "both") {
      return (
        <Scrollbar style={{ ...containerStyle, height: 320, width: 320 }}>
          {bothContent}
        </Scrollbar>
      );
    }

    return (
      <Scrollbar flow="vertical" style={{ ...containerStyle, height: 320, width: 320 }}>
        {verticalContent}
      </Scrollbar>
    );
  },
};

export const Vertical: Story = {
  argTypes: {
    flow: { table: { disable: true } },
  },
  render: () => (
    <Scrollbar flow="vertical" style={{ height: 320, width: 320, border: "1px dashed var(--bg-stroke)" }}>
      {verticalContent}
    </Scrollbar>
  ),
};

export const Horizontal: Story = {
  argTypes: {
    flow: { table: { disable: true } },
  },
  render: () => (
    <Scrollbar flow="horizontal" style={{ width: 400, border: "1px dashed var(--bg-stroke)" }}>
      {horizontalContent}
    </Scrollbar>
  ),
};

export const Both: Story = {
  argTypes: {
    flow: { table: { disable: true } },
  },
  render: () => (
    <Scrollbar style={{ height: 320, width: 320, border: "1px dashed var(--bg-stroke)" }}>
      {bothContent}
    </Scrollbar>
  ),
};
