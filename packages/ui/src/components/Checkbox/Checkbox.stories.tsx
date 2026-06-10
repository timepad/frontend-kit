import { ChangeEvent, useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";

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
      description:
        "Промежуточное состояние (часть дочерних выбрана). Не равно checked. Клик по родителю обычно выбирает всех детей или снимает выбор, если все уже выбраны.",
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

const renderBaseCheckbox: Story["render"] = () => {
  const [args, updateArgs] = useArgs<ICheckboxProps>();
  const {
    checked = false,
    indeterminate = false,
    onChange,
    ...checkboxArgs
  } = args;

  useEffect(() => {
    if (indeterminate && checked) {
      updateArgs({ indeterminate: false, checked: true });
    }
  }, [indeterminate, checked, updateArgs]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (indeterminate) {
      updateArgs({ checked: true, indeterminate: false });
    } else {
      updateArgs({ checked: event.target.checked, indeterminate: false });
    }
    onChange?.(event);
  };

  return (
    <Checkbox
      {...checkboxArgs}
      checked={checked}
      indeterminate={indeterminate}
      onChange={handleChange}
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
  render: renderBaseCheckbox,
  args: { ...defaultArgs },
};

export const Disabled: Story = {
  render: renderBaseCheckbox,
  args: { ...defaultArgs, disabled: true },
  argTypes: {
    isError: { table: { disable: true } },
  },
};

export const Error: Story = {
  render: renderBaseCheckbox,
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

type OptionId = (typeof OPTIONS)[number]["value"];

const createInitialNestedChecked = (): Record<OptionId, boolean> => ({
  "option-a": true,
  "option-b": false,
  "option-c": false,
});

export const Indeterminate: Story = {
  render: renderBaseCheckbox,
  args: { ...defaultArgs, indeterminate: true, checked: false },
};

export const IndeterminateError: Story = {
  render: renderBaseCheckbox,
  args: { ...defaultArgs, indeterminate: true, checked: false, isError: true },
  argTypes: {
    indeterminate: { table: { disable: true } },
    isError: { table: { disable: true } },
  },
};

export const NestedWithSelectAll: Story = {
  render: ({ size }) => {
    const [checked, setChecked] = useState<Record<OptionId, boolean>>(createInitialNestedChecked);

    const values = OPTIONS.map((option) => checked[option.value]);
    const allChecked = values.every(Boolean);
    const noneChecked = values.every((value) => !value);
    const parentIndeterminate = !allChecked && !noneChecked;

    const setAll = (value: boolean) => {
      setChecked(
          OPTIONS.reduce<Record<OptionId, boolean>>(
              (acc, option) => ({ ...acc, [option.value]: value }),
              {} as Record<OptionId, boolean>,
          ),
      );
    };

    const toggleOption = (id: OptionId) => {
      setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleParentChange = () => {
      setAll(!allChecked);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", rowGap: 16 }}>
          <Checkbox
              label="Заголовок"
              extraLabel="Дополнение к заголовку"
              description="Описание"
              size={size}
              checked={allChecked}
              indeterminate={parentIndeterminate}
              onChange={handleParentChange}
          />
          <div style={{ display: "flex", flexDirection: "column", rowGap: 16, paddingLeft: 24 }}>
            {OPTIONS.map((option) => (
                <Checkbox
                    key={option.value}
                    name="checkbox-group"
                    value={option.value}
                    label={option.label}
                    description={option.description}
                    extraLabel={option.extraLabel}
                    size={size}
                    checked={checked[option.value]}
                    onChange={() => toggleOption(option.value)}
                />
            ))}
          </div>
        </div>
    );
  },
  argTypes: {
    label: { table: { disable: true } },
    extraLabel: { table: { disable: true } },
    description: { table: { disable: true } },
    checked: { table: { disable: true } },
    indeterminate: { table: { disable: true } },
    isError: { table: { disable: true } },
    disabled: { table: { disable: true } },
  },
};
