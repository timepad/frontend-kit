import type { Meta, StoryObj } from "@storybook/react";

import { IconButton } from "./IconButton";
import { IconButtonSize, IconButtonVariant } from "./icon-button.types";
import {
  IconCross16Outline,
  IconCross24Outline,
  IconCross32Outline,
  IconLock16Fill,
  IconLock24Fill,
  IconLock32Fill,
  IconLock16Outline,
  IconLock24Outline,
  IconLock32Outline,
} from "../../assets/icons";

const variantOptions = [
  "primary",
  "primary-alternate",
  "secondary",
  "negative",
  "disable",
  "transparent",
] as const satisfies IconButtonVariant[];

const sizeOptions = ["xs", "s", "m"] as const satisfies IconButtonSize[];

const meta = {
  title: "Components/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: `
Управляет визуальным стилем и семантическим значением IconButton.

- **primary** — основное действие, высокий приоритет.
- **primary-alternate** — инверсный primary (для тёмных фонов).
- **secondary** — нейтральный вариант с меньшим акцентом.
- **negative** — деструктивные действия (удаление, отмена).
- **disable** — визуально отключённое, неинтерактивное состояние.
- **transparent** — минималистичная кнопка без фона для встроенных действий.
      `,
      control: "select",
      options: variantOptions,
      table: {
        type: { summary: variantOptions.join(" | ") },
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      description: `
Управляет размером IconButton.

- **xs** — ультракомпактная кнопка для плотных интерфейсов (тулбары, inline-элементы).
- **s** — компактная кнопка.
- **m** — размер по умолчанию.
      `,
      control: "select",
      options: sizeOptions,
      table: {
        type: { summary: sizeOptions.join(" | ") },
        defaultValue: { summary: "m" },
      },
    },
    icon: {
      description: `
Иконка, отображаемая внутри кнопки.

⚠️ Контрол только для Storybook:
В самом компоненте ожидается SVG React-элемент.
В Storybook значение маппится из строковых опций в реальные иконки.
      f lj,`,
      control: "select",
      options: [
        "Cross16Outline",
        "Cross24Outline",
        "Cross32Outline",
        "Lock16Fill",
        "Lock24Fill",
        "Lock32Fill",
        "Lock16Outline",
        "Lock24Outline",
        "Lock32Outline",
      ],
      mapping: {
        Cross16Outline: <IconCross16Outline />,
        Cross24Outline: <IconCross24Outline />,
        Cross32Outline: <IconCross32Outline />,
        Lock16Fill: <IconLock16Fill />,
        Lock24Fill: <IconLock24Fill />,
        Lock32Fill: <IconLock32Fill />,
        Lock16Outline: <IconLock16Outline />,
        Lock24Outline: <IconLock24Outline />,
        Lock32Outline: <IconLock32Outline />,
      },
      table: {
        type: { summary: "ReactElement<SVG>" },
      },
    },
    ariaLabel: {
      description: `
Доступное имя кнопки для скринридеров.

Используется для **icon-only** кнопок, у которых нет видимого текста.

Пример:
\`\`\`tsx
<IconButton ariaLabel="Закрыть диалог" />
\`\`\`

⚠️ Нельзя использовать одновременно с \`ariaLabelledby\`.
    `,
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },

    ariaLabelledby: {
      description: `
Ссылка на \`id\` DOM-элемента с текстом, который должен быть озвучен скринридером.

Используется, когда подходящий текст **уже есть в интерфейсе**.

Пример:
\`\`\`tsx
<h2 id="dialog-title">Настройки</h2>
<IconButton ariaLabelledby="dialog-title" />
\`\`\`

⚠️ В Storybook контрол отключён, так как требует реального элемента в DOM.
⚠️ Нельзя использовать одновременно с \`ariaLabel\`.
    `,
      control: false,
      table: {
        type: { summary: "string (id элемента)" },
      },
    },
    type: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    icon: <IconCross16Outline />,
    ariaLabel: "Close btn",
  },
};

export const PrimaryAlternate: Story = {
  args: {
    variant: "primary-alternate",
    icon: <IconCross16Outline />,
    ariaLabel: "Close btn",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    icon: <IconCross16Outline />,
    ariaLabel: "Close btn",
  },
};

export const Negative: Story = {
  args: {
    variant: "negative",
    icon: <IconCross16Outline />,
    ariaLabel: "Close btn",
  },
};

export const Disable: Story = {
  args: {
    variant: "disable",
    icon: <IconCross16Outline />,
    ariaLabel: "Close btn",
  },
};

export const Transparent: Story = {
  args: {
    variant: "transparent",
    icon: <IconCross16Outline />,
    ariaLabelledby: "Close btn",
  },
};
