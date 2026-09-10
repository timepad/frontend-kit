import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import "../../assets/styles/scrollbar.less";

const meta = {
  title: "Components/Scrollbar",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Добавить className="fk-cscrollbar" существующему контейнеру. Стили подключаются при импорте @frontend-kit/ui. Настройка доступна через CSS-переменные --fk-scrollbar-thumb-size, --fk-scrollbar-offset, --fk-scrollbar-thumb-color, --fk-scrollbar-thumb-opacity и --fk-scrollbar-thumb-radius на контейнере.',
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const itemStyle = {
  padding: "12px 16px",
  borderRadius: 8,
  background: "var(--fk-bg-secondary)",
  color: "var(--fk-text-secondary)",
} as const;

const containerStyle = { border: "1px dashed var(--fk-bg-stroke)" } as const;

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

/** Контент больше по обеим осям. */
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

export const Descendants: Story = {
  render: () => (
    <main className="fk-cscrollbar" style={{ display: "grid", gap: 24 }}>
      <section>
        <h3>Вертикальная прокрутка</h3>
        <div style={{ ...containerStyle, height: 240, width: 400, overflowY: "auto" }}>
          {verticalContent}
        </div>
      </section>
      <section>
        <h3>Горизонтальная прокрутка</h3>
        <div style={{ ...containerStyle, width: 400, overflowX: "auto" }}>
          {horizontalContent}
        </div>
      </section>
    </main>
  ),
};

export const Container: Story = {
  render: () => (
    <div className="fk-cscrollbar" style={{ ...containerStyle, height: 320, width: 320, overflow: "auto" }}>
      {bothContent}
    </div>
  ),
};

export const WithoutSizeConstraint: Story = {
  render: () => (
    <div className="fk-cscrollbar" style={{ ...containerStyle, width: 320 }}>
      {verticalContent}
    </div>
  ),
};

export const CustomAppearance: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "CSS-переменные задаются на контейнере с fk-cscrollbar через style или CSS-класс.",
      },
    },
  },
  render: () => (
    <div
      className="fk-cscrollbar"
      style={{
        ...containerStyle,
        height: 320,
        width: 320,
        overflow: "auto",
        "--fk-scrollbar-thumb-size": "8px",
        "--fk-scrollbar-offset": "4px",
        "--fk-scrollbar-thumb-color": "#8054d9",
        "--fk-scrollbar-thumb-opacity": 1,
        "--fk-scrollbar-thumb-radius": "2px",
      } as CSSProperties}
    >
      {bothContent}
    </div>
  ),
};

export const CustomDescendants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Класс и переменные заданы один раз на общем контейнере. Вложенные области с вертикальной и горизонтальной прокруткой получают одинаковое оформление без дополнительных классов или обёрток.",
      },
    },
  },
  render: () => (
    <main
      className="fk-cscrollbar"
      style={{
        display: "grid",
        gap: 24,
        "--fk-scrollbar-thumb-size": "6px",
        "--fk-scrollbar-offset": "6px",
        "--fk-scrollbar-thumb-color": "#16836b",
        "--fk-scrollbar-thumb-opacity": 0.7,
        "--fk-scrollbar-thumb-radius": "12px",
      } as CSSProperties}
    >
      <section>
        <h3>Вертикальная прокрутка</h3>
        <div style={{ ...containerStyle, height: 240, width: 400, overflowY: "auto" }}>
          {verticalContent}
        </div>
      </section>
      <section>
        <h3>Горизонтальная прокрутка</h3>
        <div style={{ ...containerStyle, width: 400, overflowX: "auto" }}>
          {horizontalContent}
        </div>
      </section>
    </main>
  ),
};
