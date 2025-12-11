import type { Meta, StoryObj } from "@storybook/react";
import { useState, ChangeEvent } from "react";

import { Textarea } from "./Textarea";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextareaBase: Story = {
  render: () => {
    const [state, setState] = useState("");

    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setState(e.target.value);
    };
    return (
      <div style={{ width: 500 }}>
        <Textarea
          label="Label"
          value={state}
          onChange={onChange}
          placeholder="Placeholder"
          description="Description"
          // error="error"
          maxSymbols={30}
          required
        />
      </div>
    );
  },
  args: {
    label: "",
    value: "",
  },
};
