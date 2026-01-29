import type { Meta, StoryObj } from "@storybook/react";

import { Breadcrumbs } from "./Breadcrumbs";
import type { IBreadcrumbItem } from "./breadcrumbs.types";

const defaultItems: IBreadcrumbItem[] = [
  { label: "Breadcrumb", href: "/" },
  { label: "Breadcrumb", href: "/breadcrumb" },
  { label: "Breadcrumb", href: "/breadcrumb/breadcrumb" },
  { label: "Breadcrumb", href: "/breadcrumb/breadcrumb/breadcrumb" },
  { label: "Breadcrumb", href: "/breadcrumb/breadcrumb/breadcrumb/breadcrumb" },
  {
    label: "Breadcrumb",
    href: "/breadcrumb/breadcrumb/breadcrumb/breadcrumb/breadcrumb",
  },
];

const meta = {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["default", "backstep"],
      description: `
#### **default**
- Стандартная иерархическая цепочка хлебных крошек  
- Отображает все элементы, разделённые **разделителем**  
- Все элементы, кроме последнего, являются кликабельными ссылками  
- Последний элемент считается **текущей страницей** (некликабельный)

#### **backstep**
- Одноуровневый паттерн «вернуться назад»  
- Используется на страницах без явной иерархии хлебных крошек  
- Использует **только первый элемент** из массива \`items\`  
- Отображает **ссылку** с иконкой стрелки влево и текстом  
- Выполняет действие через \`onClick\`, а не навигацию
      `,
      table: {
        type: { summary: `"default" | "backstep"` },
        defaultValue: { summary: "default" },
      },
    },
    items: {
      control: false,
      description: "Breadcrumb items array.",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 560, display: "grid", placeItems: "center" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "default",
    items: defaultItems,
  },
};

export const Backstep: Story = {
  args: {
    type: "backstep",
    items: [
      {
        label: "Breadcrumb",
        onClick: () => {
          console.log("[Breadcrumbs] Backstep clicked");
        },
      },
    ],
  },
  argTypes: {
    type: {
      table: {
        disable: true,
      },
    },
  },
};
