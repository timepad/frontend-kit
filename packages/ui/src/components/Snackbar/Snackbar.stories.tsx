import type { Meta, StoryObj } from "@storybook/react";

import { Snackbar } from "./Snackbar";
import { SnackbarAfter } from "./snackbar.types";
import { IconWarningDescription24Fill } from "../../assets/icons";

const afterOptions: (SnackbarAfter | undefined)[] = [undefined, "button", "icon-button"];

const meta = {
  title: "Components/Snackbar",
  component: Snackbar,
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
    after: {
      description: `
Тип правого действия.

- **undefined** — без действия
- **button** — текстовая кнопка (требует \`actionLabel\`)
- **icon-button** — кнопка закрытия
      `,
      control: "select",
      options: afterOptions,
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
    children: {
      description: "Основной текст уведомления (P4 REGULAR).",
      control: "text",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    actionLabel: {
      description: "Текст кнопки действия. Используется при `after=\"button\"`.",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    onAction: {
      description: "Обработчик клика по кнопке действия.",
      action: "action clicked",
      table: {
        type: { summary: "() => void" },
      },
    },
    variant: {
      table: {
        disable: true,
      },
    },
    icon: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  render: (args) => (
    <Snackbar.Success
      title={args.title}
      after={args.after}
      actionLabel={args.actionLabel}
      onAction={args.onAction}
    >
      {args.children}
    </Snackbar.Success>
  ),
  args: {
    title: "Какое-то сообщение.",
    children: "Текст уведомления",
    after: "button",
    actionLabel: "Кнопка",
  },
};

export const Error: Story = {
  render: (args) => (
    <Snackbar.Error
      after={args.after}
      actionLabel={args.actionLabel}
      onAction={args.onAction}
    >
      {args.children}
    </Snackbar.Error>
  ),
  args: {
    children: "Текст уведомления",
    after: "button",
    actionLabel: "Кнопка",
  },
};

export const Warning: Story = {
  render: (args) => (
    <Snackbar.Warning
      after={args.after}
      actionLabel={args.actionLabel}
      onAction={args.onAction}
    >
      {args.children}
    </Snackbar.Warning>
  ),
  args: {
    children: "Текст уведомления",
    after: "button",
    actionLabel: "Кнопка",
  },
};

export const Info: Story = {
  render: (args) => (
    <Snackbar.Info
      after={args.after}
      actionLabel={args.actionLabel}
      onAction={args.onAction}
    >
      {args.children}
    </Snackbar.Info>
  ),
  args: {
    children: "Текст уведомления",
    after: "button",
    actionLabel: "Кнопка",
  },
};

export const CustomIcon: Story = {
  render: (args) => (
    <Snackbar.Custom
      icon={<IconWarningDescription24Fill />}
      after={args.after}
      actionLabel={args.actionLabel}
      onAction={args.onAction}
    >
      {args.children}
    </Snackbar.Custom>
  ),
  args: {
    children: "Текст уведомления",
    after: "button",
    actionLabel: "Кнопка",
  },
};

export const WithoutAction: Story = {
  render: (args) => <Snackbar.Success>{args.children}</Snackbar.Success>,
  args: {
    children: "Текст уведомления",
  },
};

export const WithCloseButton: Story = {
  render: (args) => (
    <Snackbar.Success after="icon-button" onAction={args.onAction}>
      {args.children}
    </Snackbar.Success>
  ),
  args: {
    children: "Текст уведомления",
    after: "icon-button",
  },
};

export const AllVariants: Story = {
  args: {
    children: "Текст уведомления",
  },
  render: () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    <Snackbar.Success title="Какое-то сообщение." after="button" actionLabel="Кнопка">
      Текст уведомления
    </Snackbar.Success>
    <Snackbar.Success title="Какое-то сообщение." after="icon-button">
      Текст уведомления
    </Snackbar.Success>
    <Snackbar.Error title="Какое-то сообщение." after="button" actionLabel="Кнопка">
      Текст уведомления
    </Snackbar.Error>
    <Snackbar.Error title="Какое-то сообщение." after="icon-button">
      Текст уведомления
    </Snackbar.Error>
    <Snackbar.Warning title="Какое-то сообщение." after="button" actionLabel="Кнопка">
      Текст уведомления
    </Snackbar.Warning>
    <Snackbar.Warning title="Какое-то сообщение." after="icon-button">
      Текст уведомления
    </Snackbar.Warning>
    <Snackbar.Info title="Какое-то сообщение." after="button" actionLabel="Кнопка">
      Текст уведомления
    </Snackbar.Info>
    <Snackbar.Info title="Какое-то сообщение." after="icon-button">
      Текст уведомления
    </Snackbar.Info>
    <Snackbar.Custom
      icon={<IconWarningDescription24Fill />}
      title="Какое-то сообщение."
      after="button"
      actionLabel="Кнопка"
    >
      Текст уведомления
    </Snackbar.Custom>
    <Snackbar.Custom
      icon={<IconWarningDescription24Fill />}
      title="Какое-то сообщение."
      after="icon-button"
    >
      Текст уведомления
    </Snackbar.Custom>
  </div>
  ),
};
