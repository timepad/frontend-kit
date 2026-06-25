import type { Meta } from "@storybook/react";
import type { ReactElement } from "react";

import { Snackbar } from "./Snackbar";
import { ISnackbarVariantProps, SnackbarActionButton } from "./snackbar.types";
import { IconWarningDescription24Fill } from "../../assets/icons";

const actionButtonOptions: (SnackbarActionButton | undefined)[] = [
  undefined,
  "button",
  "icon-button",
];

const meta = {
  title: "Components/Snackbar",
  component: Snackbar.Success,
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    actionButton: {
      description: `
Тип правого действия.

- **undefined** — без действия
- **button** — текстовая кнопка (требует \`actionLabel\`)
- **icon-button** — кнопка закрытия (можно передать \`actionAriaLabel\`)
      `,
      control: "select",
      options: actionButtonOptions,
      labels: {
        undefined: "без действия",
        button: "button",
        "icon-button": "icon-button",
      },
      table: {
        type: { summary: `"button" | "icon-button"` },
        defaultValue: { summary: "undefined" },
      },
    },
    title: {
      description: "Опциональный заголовок (P4 BOLD).",
      control: "text",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    label: {
      description: "Основной текст уведомления (P4 REGULAR).",
      control: "text",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    actionLabel: {
      description: "Текст кнопки действия. Используется при `actionButton=\"button\"`.",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    actionAriaLabel: {
      description: "Aria-label для icon-button. Используется при `actionButton=\"icon-button\"`.",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Закрыть" },
      },
    },
    onActionClick: {
      description: "Обработчик клика по кнопке действия.",
      action: "action clicked",
      table: {
        type: { summary: "MouseEventHandler<HTMLButtonElement>" },
      },
    },
  },
} satisfies Meta<typeof Snackbar.Success>;

export default meta;

type Story = {
  render?: (args: ISnackbarVariantProps) => ReactElement;
  args?: ISnackbarVariantProps;
};

export const Success: Story = {
  render: (args) => <Snackbar.Success {...args} />,
  args: {
    title: "Какое-то сообщение.",
    label: "Текст уведомления",
    actionButton: "button",
    actionLabel: "Кнопка",
  },
};

export const Error: Story = {
  render: (args) => <Snackbar.Error {...args} />,
  args: {
    label: "Текст уведомления",
    actionButton: "button",
    actionLabel: "Кнопка",
  },
};

export const Warning: Story = {
  render: (args) => <Snackbar.Warning {...args} />,
  args: {
    label: "Текст уведомления",
    actionButton: "button",
    actionLabel: "Кнопка",
  },
};

export const Info: Story = {
  render: (args) => <Snackbar.Info {...args} />,
  args: {
    label: "Текст уведомления",
    actionButton: "button",
    actionLabel: "Кнопка",
  },
};

export const CustomIcon: Story = {
  render: (args) => (
    <Snackbar.Custom
      icon={<IconWarningDescription24Fill />}
      {...args}
    />
  ),
  args: {
    label: "Текст уведомления",
    actionButton: "button",
    actionLabel: "Кнопка",
  },
};

export const WithoutAction: Story = {
  render: (args) => <Snackbar.Success {...args} />,
  args: {
    label: "Текст уведомления",
  },
};

export const WithCloseButton: Story = {
  render: (args) => <Snackbar.Success {...args} />,
  args: {
    label: "Текст уведомления",
    actionButton: "icon-button",
  },
};

export const AllVariants: Story = {
  args: {
    label: "Текст уведомления",
  },
  render: () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    <Snackbar.Success title="Какое-то сообщение." label="Какое-то сообщение в лайбл" actionButton="button" actionLabel="Кнопка" />
    <Snackbar.Success title="Какое-то сообщение." label="Какое-то сообщение в лайбл" actionButton="icon-button" />
    <Snackbar.Error title="Какое-то сообщение." label="Какое-то сообщение в лайбл" actionButton="button" actionLabel="Кнопка" />
    <Snackbar.Error title="Какое-то сообщение." label="Какое-то сообщение в лайбл" actionButton="icon-button" />
    <Snackbar.Warning title="Какое-то сообщение." label="Какое-то сообщение в лайбл" actionButton="button" actionLabel="Кнопка" />
    <Snackbar.Warning title="Какое-то сообщение." label="Какое-то сообщение в лайбл" actionButton="icon-button" />
    <Snackbar.Info title="Какое-то сообщение." label="Какое-то сообщение в лайбл" actionButton="button" actionLabel="Кнопка" />
    <Snackbar.Info title="Какое-то сообщение." label="Какое-то сообщение в лайбл" actionButton="icon-button" />
    <Snackbar.Custom
      icon={<IconWarningDescription24Fill />}
      title="Какое-то сообщение."
      label="Какое-то сообщение в лайбл"
      actionButton="button"
      actionLabel="Кнопка"
    />
    <Snackbar.Custom
      icon={<IconWarningDescription24Fill />}
      title="Какое-то сообщение."
      label="Какое-то сообщение в лайбл"
      actionButton="icon-button"
    />
  </div>
  ),
};
