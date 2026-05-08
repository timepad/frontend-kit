import { FC, useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Radio } from "./Radio";
import { IRadioProps } from "./radio.types";

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "fit-content" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      description: `
Размер радио-кнопки и подписи.

- **s** — компактный (меньший кружок и отступы)
- **m** — стандартный (по умолчанию)
- **l** — крупный
      `,
      control: "inline-radio",
      options: ["s", "m", "l"],
      table: {
        type: { summary: "RadioSize" },
        defaultValue: { summary: "m" },
      },
    },
    label: {
      control: "text",
      description:
        "Основная подпись (лейбл) рядом с кружком. Обязательный проп.",
      table: { type: { summary: "ReactNode (required)" } },
    },
    extraLabel: {
      control: "text",
      description:
        "Дополнительный текст рядом с подписью. Отображается цветом tertiary.",
      table: { type: { summary: "ReactNode" } },
    },
    checked: {
      control: "boolean",
      description: "Контролируемое состояние выбора (выбрана ли кнопка).",
      table: { type: { summary: "boolean" } },
    },
    description: {
      control: "text",
      description: "Вспомогательный текст под подписью.",
      table: { type: { summary: "ReactNode" } },
    },
    disabled: {
      control: "boolean",
      description: "Отключает возможность выбора.",
      table: { type: { summary: "boolean" } },
    },
    isError: {
      control: "boolean",
      description: "Визуальное состояние ошибки (красная обводка кружка).",
      table: { type: { summary: "boolean" } },
    },
    onChange: {
      table: { disable: true },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Radio>;

const BaseRadio: FC<IRadioProps> = (args) => {
  const [checked, setChecked] = useState(args.checked ?? false);

  useEffect(() => {
    setChecked(args?.checked ?? false);
  }, [args.checked]);

  return (
    <Radio
      {...args}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};

const defaultArgs: Story["args"] = {
  label: "Заголовок",
  extraLabel: "Дополнение к заголовку",
  description: "Описание",
  isError: false,
  disabled: false,
  checked: false,
};

export const Default: Story = {
  render: (args) => <BaseRadio {...args} />,
  args: { ...defaultArgs },
};

export const Disabled: Story = {
  render: (args) => <BaseRadio {...args} />,
  args: { ...defaultArgs, disabled: true },
  argTypes: {
    isError: { table: { disable: true } },
    disabled: { table: { disable: true } },
  },
};

export const Error: Story = {
  render: (args) => <BaseRadio {...args} />,
  args: { ...defaultArgs, isError: true },
  argTypes: {
    disabled: { table: { disable: true } },
    isError: { table: { disable: true } },
  },
};

const OPTIONS = [
  {
    value: "option-a",
    label: "Вариант A",
    extraLabel: (
      <a href="#" target="__blank">
        ссылка 1
      </a>
    ),
    description: "Описание первого варианта",
  },
  {
    value: "option-b",
    label: "Вариант B",
    extraLabel: (
      <a href="#" target="__blank">
        ссылка 2
      </a>
    ),
    description: "Описание второго варианта",
  },
  {
    value: "option-c",
    label: "Вариант C",
    extraLabel: (
      <a href="#" target="__blank">
        ссылка 3
      </a>
    ),
    description: "Описание третьего варианта",
  },
] as const;

export const Group: Story = {
  render: ({ size }) => {
    const [selected, setSelected] = useState<string>(OPTIONS[0].value);

    return (
      <div style={{ display: "flex", flexDirection: "column", rowGap: 16 }}>
        {OPTIONS.map((option) => (
          <Radio
            key={option.value}
            name="radio-group"
            value={option.value}
            label={option.label}
            description={option.description}
            checked={selected === option.value}
            onChange={(e) => setSelected(e.target.value)}
            extraLabel={option.extraLabel}
            size={size}
          />
        ))}
      </div>
    );
  },
  argTypes: {
    label: { table: { disable: true } },
    extraLabel: { table: { disable: true } },
    description: { table: { disable: true } },
    checked: { table: { disable: true } },
    isError: { table: { disable: true } },
    disabled: { table: { disable: true } },
  },
};
