import type { Meta, StoryObj } from "@storybook/react";

import { Scrollbar } from "./Scrollbar";
import type { ScrollbarAxis } from "./scrollbar.types";

const axisOptions = ["auto", "vertical", "horizontal"] as const satisfies readonly ScrollbarAxis[];

const meta = {
  title: "Components/Scrollbar",
  component: Scrollbar,
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
      description: {
        component: [
          "Внешний вид для полосы прокрутки.",
          "По умолчанию `axis=\"auto\"` (`overflow: auto`) — браузер сам показывает нужные полосы. `axis` ограничивает направление при необходимости.",
          "Scrollbar не вычисляет свои размеры: ограничение через `height`, `max-height`, `width` или `max-width` задаёт потребитель.",
          "Без ограничения контейнер растянется по содержимому и переполнения (полос прокрутки) не возникнет.",
        ].join(" "),
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    axis: {
      control: "select",
      options: [...axisOptions],
    },
  },
  args: {
    axis: "auto",
  },
} satisfies Meta<typeof Scrollbar>;

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
  parameters: {
    docs: {
      description: {
        story:
          "Размеры заданы на экземпляре (`height` / `width`). Без такого ограничения скролла не будет — см. сторис Without size constraint.",
      },
    },
  },
  render: ({ axis = "auto" }) => {
    if (axis === "horizontal") {
      return (
        <Scrollbar axis="horizontal" style={{ ...containerStyle, width: 400 }}>
          {horizontalContent}
        </Scrollbar>
      );
    }

    if (axis === "vertical") {
      return (
        <Scrollbar axis="vertical" style={{ ...containerStyle, height: 320, width: 320 }}>
          {verticalContent}
        </Scrollbar>
      );
    }

    return (
      <Scrollbar axis="auto" style={{ ...containerStyle, height: 320, width: 320 }}>
        {bothContent}
      </Scrollbar>
    );
  },
};

export const Vertical: Story = {
  args: { axis: "vertical" },
  argTypes: {
    axis: { table: { disable: true } },
  },
  render: () => (
    <Scrollbar axis="vertical" style={{ ...containerStyle, height: 320, width: 320 }}>
      {verticalContent}
    </Scrollbar>
  ),
};

export const Horizontal: Story = {
  args: { axis: "horizontal" },
  argTypes: {
    axis: { table: { disable: true } },
  },
  render: () => (
    <Scrollbar axis="horizontal" style={{ ...containerStyle, width: 400 }}>
      {horizontalContent}
    </Scrollbar>
  ),
};

export const Both: Story = {
  name: "Auto (both)",
  args: { axis: "auto" },
  argTypes: {
    axis: { table: { disable: true } },
  },
  render: () => (
    <Scrollbar style={{ ...containerStyle, height: 320, width: 320 }}>
      {bothContent}
    </Scrollbar>
  ),
};

export const WithoutSizeConstraint: Story = {
  name: "Without size constraint",
  argTypes: {
    axis: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Только декоративная рамка, без `height` / `max-height`. Контейнер растягивается по содержимому — полоса прокрутки не появляется.",
      },
    },
  },
  render: () => (
    <Scrollbar style={{ ...containerStyle, width: 320 }}>
      {verticalContent}
    </Scrollbar>
  ),
};
