import type { ChangeEvent } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";

import { Switch } from "./Switch";
import { ISwitchProps } from "./switch.types";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
    },
  },
  argTypes: {
    size: {
      description: `
Размер переключателя.

- **m** — 24px (по умолчанию)
- **l** — 32px
      `,
      control: "inline-radio",
      options: ["m", "l"],
      table: {
        type: { summary: "SwitchSize" },
        defaultValue: { summary: "m" },
      },
    },
    checked: {
      control: "boolean",
      description: "Контролируемое состояние (включён/выключен).",
      table: { type: { summary: "boolean" } },
    },
    disabled: {
      control: "boolean",
      description:
        "Заблокированный переключатель. При наведении показывается курсор not-allowed.",
      table: { type: { summary: "boolean" } },
    },
    onChange: {
      table: { disable: true },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

const renderBaseSwitch: Story["render"] = () => {
  const [args, updateArgs] = useArgs<ISwitchProps>();
  const { checked = false, onChange, ...switchArgs } = args;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateArgs({ checked: event.target.checked });
    onChange?.(event);
  };

  return (
    <Switch {...switchArgs} checked={checked} onChange={handleChange} />
  );
};

const defaultArgs: Story["args"] = {
  size: "m",
  checked: false,
  disabled: false,
};

export const Default: Story = {
  render: renderBaseSwitch,
  args: { ...defaultArgs },
};

export const Checked: Story = {
  render: renderBaseSwitch,
  args: { ...defaultArgs, checked: true },
};

export const Disabled: Story = {
  render: renderBaseSwitch,
  args: { ...defaultArgs, disabled: true },
};

export const DisabledChecked: Story = {
  render: renderBaseSwitch,
  args: { ...defaultArgs, checked: true, disabled: true },
};

export const Sizes: Story = {
  render: renderBaseSwitch,
  args: { ...defaultArgs, checked: true },
  argTypes: {
    size: { table: { disable: true } },
  },
  decorators: [
    () => {
      const [args, updateArgs] = useArgs<ISwitchProps>();
      const { checked = true, onChange, size: _size, ...switchArgs } = args;

      const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateArgs({ checked: event.target.checked });
        onChange?.(event);
      };

      return (
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Switch
            {...switchArgs}
            size="m"
            checked={checked}
            onChange={handleChange}
          />
          <Switch
            {...switchArgs}
            size="l"
            checked={checked}
            onChange={handleChange}
          />
        </div>
      );
    },
  ],
};
