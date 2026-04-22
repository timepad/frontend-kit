import { FC, useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "./Checkbox";
import { ICheckboxProps } from "./checkbox.types";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
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
Размер чекбокса и подписи.

- **s** — компактный
- **m** — стандартный (по умолчанию)
- **l** — крупный
      `,
      control: "inline-radio",
      options: ["s", "m", "l"],
      table: {
        type: { summary: "CheckboxSize" },
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
      description: "Контролируемое состояние выбора (выбран/не выбран).",
      table: { type: { summary: "boolean" } },
    },
    indeterminate: {
      control: "boolean",
      description: "Неопределенное состояние чекбокса.",
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

type Story = StoryObj<typeof Checkbox>;

const BaseCheckbox: FC<ICheckboxProps> = (args) => {
  const [checked, setChecked] = useState<boolean>(args.checked ?? false);

  useEffect(() => {
    setChecked(args?.checked ?? false);
  }, [args.checked]);

  return (
    <Checkbox
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
  render: (args) => <BaseCheckbox {...args} />,
  args: { ...defaultArgs },
};

export const Disabled: Story = {
  render: (args) => <BaseCheckbox {...args} />,
  args: { ...defaultArgs, disabled: true },
  argTypes: {
    isError: { table: { disable: true } },
    disabled: { table: { disable: true } },
  },
};

export const Error: Story = {
  render: (args) => <BaseCheckbox {...args} />,
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
    const [selected, setSelected] = useState<string[]>([OPTIONS[0].value]);

    const handleToggle = (value: string) => {
      setSelected((prev) =>
        prev.includes(value)
          ? prev.filter((selectedValue) => selectedValue !== value)
          : [...prev, value],
      );
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", rowGap: 16 }}>
        {OPTIONS.map((option) => (
          <Checkbox
            key={option.value}
            name="checkbox-group"
            value={option.value}
            label={option.label}
            description={option.description}
            checked={selected.includes(option.value)}
            onChange={() => handleToggle(option.value)}
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

export const Indeterminate : Story = {
  render: (args) => <BaseCheckbox {...args} />,
  args: { ...defaultArgs, indeterminate: true },
  argTypes: {
    indeterminate: { table: { disable: true } }
  },
};

export const IndeterminateError : Story = {
  render: (args) => <BaseCheckbox {...args} />,
  args: { ...defaultArgs, indeterminate: true, checked: false, isError: true },
  argTypes: {
    indeterminate: { table: { disable: true } },
    isError: { table: { disable: true } },
  },
};

export const IndeterminateErrorChecked : Story = {
  render: (args) => <BaseCheckbox {...args} />,
  args: { ...defaultArgs, indeterminate: true, checked: true, isError: true },
  argTypes: {
    indeterminate: { table: { disable: true } },
    isError: { table: { disable: true } },
  },
};

export const IndeterminateErrorCheckedDisabled: Story = {
  render: (args) => <BaseCheckbox {...args} />,
  args: { ...defaultArgs, indeterminate: true, checked: true, isError: true, disabled: true },
  argTypes: {
    indeterminate: { table: { disable: true } },
    isError: { table: { disable: true } },
    disabled: { table: { disable: true } },
  },
};
