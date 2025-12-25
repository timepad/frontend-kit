import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Input } from "./Input";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => {
    const [value, setValue] = useState("value");

    return (
      <Input
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onValueChange={setValue}
        onClearField={() => setValue("")}
      />
    );
  },
  args: {
    label: "Label",
    placeholder: "Placeholder",
    description: "Description",
    required: true,
  },
};

export const Masked: Story = {
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <Input
        {...args}
        value={value}
        mask="+7 (999) 999-99-99"
        onChange={(e) => setValue(e.target.value)}
        onValueChange={setValue}
        onClearField={() => setValue("")}
      />
    );
  },
  args: {
    label: "Телефон",
    description: "Введите телефон в формате +7 (999) 999-99-99",
    required: true,
  },
};

// export const WithValidation: Story = {
//   render: (args) => {
//     const [value, setValue] = useState("");

//     return (
//       <Input
//         {...args}
//         value={value}
//         mask="99"
//         validateOn="blur"
//         validator={({ raw, isComplete }) => {
//           if (!raw) return null;
//           if (!isComplete) return "Заполните 2 цифры";

//           const n = Number(raw);
//           if (n < 1 || n > 30) return "Допустимо от 1 до 30";
//           return null;
//         }}
//         onChange={(e) => setValue(e.target.value)}
//         onClearField={() => setValue("")}
//       />
//     );
//   },
//   args: {
//     label: "Толщина",
//     description: "Валидируемое поле",
//   },
// };

