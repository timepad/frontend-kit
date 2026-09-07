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
    },
  },
  tags: ["autodocs"],
  argTypes: {
    axis: {
      control: "select",
      options: [...axisOptions],
      description: "Публичный prop. `auto` — полосы по контенту; `vertical` / `horizontal` — ограничение оси.",
    },
  },
  args: {
    axis: "auto",
  },
} satisfies Meta<typeof Scrollbar>;

export default meta;

type Story = StoryObj<typeof meta>;

const itemStyle = {
  padding: "12px 16px",
  borderRadius: 8,
  background: "var(--bg-secondary)",
  color: "var(--text-secondary)",
} as const;

const containerStyle = { border: "1px dashed var(--bg-stroke)" } as const;

/** Контент выше контейнера — появляется вертикальная полоса. */
const verticalContent = (
  <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 16 }}>
    {Array.from({ length: 20 }, (_, index) => (
      <div key={index} style={itemStyle}>
        Элемент списка {index + 1}
      </div>
    ))}
  </div>
);

/** Контент шире контейнера — появляется горизонтальная полоса. */
const horizontalContent = (
  <div style={{ display: "flex", gap: 12, padding: 16, width: "max-content" }}>
    {Array.from({ length: 20 }, (_, index) => (
      <div key={index} style={{ ...itemStyle, flexShrink: 0, width: 160 }}>
        Колонка {index + 1}
      </div>
    ))}
  </div>
);

/** Контент больше по обеим осям — при `axis="auto"` видны обе полосы. */
const bothContent = (
  <div style={{ padding: 16, width: "max-content" }}>
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {Array.from({ length: 20 }, (_, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex", gap: 12 }}>
          {Array.from({ length: 8 }, (_, colIndex) => (
            <div key={colIndex} style={{ ...itemStyle, flexShrink: 0, width: 120 }}>
              {rowIndex + 1}:{colIndex + 1}
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "как при `auto` автоматически появляются нужные полосы, а при ограничении оси — только одна.",
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

export const Auto: Story = {
  args: { axis: "auto" },
  argTypes: {
    axis: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story:
          "`axis=\"auto\"`: контент переполняет контейнер по обеим осям — браузер показывает вертикальную и горизонтальную полосы.",
      },
    },
  },
  render: () => (
    <Scrollbar style={{ ...containerStyle, height: 320, width: 320 }}>
      {bothContent}
    </Scrollbar>
  ),
};

export const Vertical: Story = {
  args: { axis: "vertical" },
  argTypes: {
    axis: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: "`axis=\"vertical\"`: только вертикальная прокрутка, контент выше контейнера.",
      },
    },
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
  parameters: {
    docs: {
      description: {
        story: "`axis=\"horizontal\"`: только горизонтальная прокрутка, контент шире контейнера.",
      },
    },
  },
  render: () => (
    <Scrollbar axis="horizontal" style={{ ...containerStyle, width: 400 }}>
      {horizontalContent}
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
          "Без `height` / `max-height` контейнер растягивается по содержимому — полоса прокрутки не появляется.",
      },
    },
  },
  render: () => (
    <Scrollbar style={{ ...containerStyle, width: 320 }}>
      {verticalContent}
    </Scrollbar>
  ),
};
