import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Snackbar } from "./Snackbar";
import { SnackbarSuccess } from "./SnackbarSuccess";
import { ISnackbarVariantProps, SnackbarActionButton } from "./snackbar.types";
import { IconWarningDescription24Fill } from "../../assets/icons";

type SnackbarStoryArgs = {
  label: string;
  title?: string;
  actionButton?: SnackbarActionButton;
  actionLabel?: string;
  actionAriaLabel?: string;
  onActionClick?: ReturnType<typeof fn>;
};

const toSnackbarProps = (args: SnackbarStoryArgs): ISnackbarVariantProps => {
  if (args.actionButton === "button") {
    return {
      label: args.label,
      title: args.title,
      actionButton: "button",
      actionLabel: args.actionLabel ?? "Кнопка",
      onActionClick: args.onActionClick,
    };
  }

  if (args.actionButton === "icon-button") {
    return {
      label: args.label,
      title: args.title,
      actionButton: "icon-button",
      actionAriaLabel: args.actionAriaLabel,
      onActionClick: args.onActionClick,
    };
  }

  return {
    label: args.label,
    title: args.title,
  };
};

const actionButtonOptions: (SnackbarActionButton | undefined)[] = [
  undefined,
  "button",
  "icon-button",
];

const meta = {
  title: "Components/Snackbar",
  component: SnackbarSuccess,
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
      description: 'Текст кнопки действия. Используется при `actionButton="button"`.',
      control: "text",
      if: { arg: "actionButton", eq: "button" },
      table: {
        type: { summary: "string" },
      },
    },
    actionAriaLabel: {
      description: 'Aria-label для icon-button. Используется при `actionButton="icon-button"`.',
      control: "text",
      if: { arg: "actionButton", eq: "icon-button" },
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Закрыть" },
      },
    },
    onActionClick: {
      description: "Обработчик клика по кнопке действия.",
      action: "action clicked",
      if: { arg: "actionButton", neq: undefined },
      table: {
        type: { summary: "MouseEventHandler<HTMLButtonElement>" },
      },
    },
  },
} satisfies Meta<SnackbarStoryArgs>;

export default meta;

type Story = StoryObj<SnackbarStoryArgs>;

export const Success: Story = {
  render: (args) => <Snackbar.Success {...toSnackbarProps(args)} />,
  args: {
    title: "Какое-то сообщение.",
    label: "Текст уведомления",
    actionButton: "button",
    actionLabel: "Кнопка",
    onActionClick: fn(),
  },
};

export const Error: Story = {
  render: (args) => <Snackbar.Error {...toSnackbarProps(args)} />,
  args: {
    label: "Текст уведомления",
    actionButton: "button",
    actionLabel: "Кнопка",
    onActionClick: fn(),
  },
};

export const Warning: Story = {
  render: (args) => <Snackbar.Warning {...toSnackbarProps(args)} />,
  args: {
    label: "Текст уведомления",
    actionButton: "button",
    actionLabel: "Кнопка",
    onActionClick: fn(),
  },
};

export const Info: Story = {
  render: (args) => <Snackbar.Info {...toSnackbarProps(args)} />,
  args: {
    label: "Текст уведомления",
    actionButton: "button",
    actionLabel: "Кнопка",
    onActionClick: fn(),
  },
};

export const CustomIcon: Story = {
  render: (args) => (
    <Snackbar.Custom
      icon={<IconWarningDescription24Fill />}
      {...toSnackbarProps(args)}
    />
  ),
  args: {
    label: "Текст уведомления",
    actionButton: "button",
    actionLabel: "Кнопка",
    onActionClick: fn(),
  },
};

export const WithoutAction: Story = {
  render: (args) => <Snackbar.Success {...toSnackbarProps(args)} />,
  args: {
    label: "Текст уведомления",
  },
};

export const WithCloseButton: Story = {
  render: (args) => <Snackbar.Success {...toSnackbarProps(args)} />,
  args: {
    label: "Текст уведомления",
    actionButton: "icon-button",
    onActionClick: fn(),
  },
};

export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Snackbar.Success
        title="Какое-то сообщение."
        label="Какое-то сообщение в лайбл"
        actionButton="button"
        actionLabel="Кнопка"
        onActionClick={fn()}
      />
      <Snackbar.Success
        title="Какое-то сообщение."
        label="Какое-то сообщение в лайбл"
        actionButton="icon-button"
        onActionClick={fn()}
      />
      <Snackbar.Error
        title="Какое-то сообщение."
        label="Какое-то сообщение в лайбл"
        actionButton="button"
        actionLabel="Кнопка"
        onActionClick={fn()}
      />
      <Snackbar.Error
        title="Какое-то сообщение."
        label="Какое-то сообщение в лайбл"
        actionButton="icon-button"
        onActionClick={fn()}
      />
      <Snackbar.Warning
        title="Какое-то сообщение."
        label="Какое-то сообщение в лайбл"
        actionButton="button"
        actionLabel="Кнопка"
        onActionClick={fn()}
      />
      <Snackbar.Warning
        title="Какое-то сообщение."
        label="Какое-то сообщение в лайбл"
        actionButton="icon-button"
        onActionClick={fn()}
      />
      <Snackbar.Info
        title="Какое-то сообщение."
        label="Какое-то сообщение в лайбл"
        actionButton="button"
        actionLabel="Кнопка"
        onActionClick={fn()}
      />
      <Snackbar.Info
        title="Какое-то сообщение."
        label="Какое-то сообщение в лайбл"
        actionButton="icon-button"
        onActionClick={fn()}
      />
      <Snackbar.Custom
        icon={<IconWarningDescription24Fill />}
        title="Какое-то сообщение."
        label="Какое-то сообщение в лайбл"
        actionButton="button"
        actionLabel="Кнопка"
        onActionClick={fn()}
      />
      <Snackbar.Custom
        icon={<IconWarningDescription24Fill />}
        title="Какое-то сообщение."
        label="Какое-то сообщение в лайбл"
        actionButton="icon-button"
        onActionClick={fn()}
      />
    </div>
  ),
};
