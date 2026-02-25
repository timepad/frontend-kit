import { FC, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { MaskedInput } from "./MaskedInput";

const meta: Meta<typeof MaskedInput> = {
  title: "Components/MaskedInput",
  component: MaskedInput,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof MaskedInput>;

const Controlled: FC<any> = (args) => {
  const [value, setValue] = useState(args.value ?? "");
  return <MaskedInput {...args} value={value} onValueChange={setValue} />;
};

export const Phone: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Телефон",
    mask: "+7 999 999-99-99",
    placeholders: { digit: "0" },
    
  },
};

export const Time: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Время",
    mask: "99:99",
    placeholders: { digit: "0" },
  },
};
