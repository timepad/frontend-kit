import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { FC, useState } from "react";

import { Modal } from "./Modal";
import {
  ModalFooterDirection,
  ModalHeaderAlign,
  ModalSize,
} from "./modal.types";
import { Typography } from "../Typography";

const modalSizeOptions = ["s", "m", "l", "full"] as const satisfies ModalSize[];
const footerDirectionOptions = ["column", "row"] as const satisfies ModalFooterDirection[];
const headerAlignOptions = ["center", "start"] as const satisfies ModalHeaderAlign[];

type ModalStoryArgs = {
  size: ModalSize;
  footerDirection: ModalFooterDirection;
  headerAlign: ModalHeaderAlign;
  withFooterDivider: boolean;
  withTitle: boolean;
  withSubtitle: boolean;
  withHeaderBtnBack: boolean;
  withHeaderBtnClose: boolean;
  withFooterBefore: boolean;
  withFooterAfter: boolean;
  withFooterBtnBack: boolean;
  withFooterBtnCancel: boolean;
  withFooterBtnConfirm: boolean;
};

const defaultModalSlotArgs = {
  withTitle: true,
  withSubtitle: true,
  withHeaderBtnBack: true,
  withHeaderBtnClose: true,
  withFooterBefore: true,
  withFooterAfter: true,
  withFooterBtnBack: true,
  withFooterBtnCancel: true,
  withFooterBtnConfirm: true,
} satisfies Pick<
  ModalStoryArgs,
  | "withTitle"
  | "withSubtitle"
  | "withHeaderBtnBack"
  | "withHeaderBtnClose"
  | "withFooterBefore"
  | "withFooterAfter"
  | "withFooterBtnBack"
  | "withFooterBtnCancel"
  | "withFooterBtnConfirm"
>;

const layoutControlsOnly = [
  "size",
  "footerDirection",
  "headerAlign",
  "withFooterDivider",
] as const;

const normalizeModalStoryArgs = (args: ModalStoryArgs): ModalStoryArgs => {
  if (args.size === "s") {
    return { ...args, withFooterDivider: false };
  }

  return { ...args, footerDirection: "column" };
};

const ModalPlaygroundContent = ({
  onClose,
  withTitle,
  withSubtitle,
  withHeaderBtnBack,
  withHeaderBtnClose,
  withFooterBefore,
  withFooterAfter,
  withFooterBtnBack,
  withFooterBtnCancel,
  withFooterBtnConfirm,
}: Pick<
  ModalStoryArgs,
  | "withTitle"
  | "withSubtitle"
  | "withHeaderBtnBack"
  | "withHeaderBtnClose"
  | "withFooterBefore"
  | "withFooterAfter"
  | "withFooterBtnBack"
  | "withFooterBtnCancel"
  | "withFooterBtnConfirm"
> & {
  onClose: () => void;
}) => (
  <>
    <Modal.Header>
      {withHeaderBtnBack && <Modal.Header.BtnBack onBack={fn()} />}
      {withTitle && <Modal.Header.Title>Заголовок</Modal.Header.Title>}
      {withSubtitle && (
        <Modal.Header.Subtitle>Подзаголовок</Modal.Header.Subtitle>
      )}
      {withHeaderBtnClose && <Modal.Header.BtnClose onClose={onClose} />}
    </Modal.Header>

    <Modal.Body>
      <Typography.Paragraph tag="P4 REGULAR">
        Контент модального окна. Нажмите вне модалки или на крестик, чтобы
        закрыть.
      </Typography.Paragraph>
    </Modal.Body>

    <Modal.Footer>
      {withFooterBefore && (
        <Modal.Footer.Before>
          <Typography.Paragraph tag="P4 REGULAR">
            Дополнительный текст перед кнопками
          </Typography.Paragraph>
        </Modal.Footer.Before>
      )}

      {withFooterBtnBack && <Modal.Footer.BtnBack />}
      {withFooterBtnCancel && <Modal.Footer.BtnCancel onClick={onClose} />}
      {withFooterBtnConfirm && <Modal.Footer.BtnConfirm onClick={onClose} />}

      {withFooterAfter && (
        <Modal.Footer.After>
          <Typography.Paragraph tag="P4 REGULAR">
            Подсказка после кнопок
          </Typography.Paragraph>
        </Modal.Footer.After>
      )}
    </Modal.Footer>
  </>
);

const ModalStoryView = (args: ModalStoryArgs) => {
  const {
    size,
    footerDirection,
    headerAlign,
    withFooterDivider,
    ...slotArgs
  } = args;
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Открыть окно
      </button>

      <Modal
        isOpen={open}
        onClose={handleClose}
        size={size}
        footerDirection={footerDirection}
        headerAlign={headerAlign}
        withFooterDivider={withFooterDivider}
      >
        <ModalPlaygroundContent onClose={handleClose} {...slotArgs} />
      </Modal>
    </>
  );
};

const renderModalStory =
  (View: FC<ModalStoryArgs>) => (args: ModalStoryArgs) =>
    <View {...normalizeModalStoryArgs(args)} />;

const meta = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
    docs: { codePanel: true },
    controls: { exclude: ["isOpen"] },
  },
  tags: ["autodocs"],
  render: renderModalStory(ModalStoryView),
  argTypes: {
    size: {
      description: `
Размер модального окна.

- **s** — компактное окно (до 440px); на мобильных — bottom sheet с drag-панелью.
- **m** — среднее окно (до 600px), футер в режиме toolbar.
- **l** — широкое окно (до 960px), футер в режиме toolbar.
- **full** — максимальная ширина (до 1024px / почти на всю ширину viewport).

На мобильных (portrait) фактически всегда применяется **s**.
      `,
      control: "select",
      options: modalSizeOptions,
      table: {
        category: "Modal",
        type: { summary: modalSizeOptions.join(" | ") },
        defaultValue: { summary: "s" },
      },
    },
    footerDirection: {
      description: `
Направление раскладки футера. Доступно только при **size = s**.

- **column** — кнопки столбцом (layout \`stack\`).
- **row** — cancel и confirm в одну строку (layout \`inline-actions\`).

Для **m**, **l** и **full** футер всегда toolbar — параметр не применяется.
      `,
      control: "select",
      options: footerDirectionOptions,
      if: { arg: "size", eq: "s" },
      table: {
        category: "Modal",
        type: { summary: footerDirectionOptions.join(" | ") },
        defaultValue: { summary: "column" },
      },
    },
    headerAlign: {
      description: `
Выравнивание заголовка и подзаголовка в шапке.

- **center** — по центру.
- **start** — по левому краю (модификатор \`align-start\`).
      `,
      control: "select",
      options: headerAlignOptions,
      table: {
        category: "Modal",
        type: { summary: headerAlignOptions.join(" | ") },
        defaultValue: { summary: "center" },
      },
    },
    withFooterDivider: {
      description: `
Верхняя граница-разделитель у футера (\`box-shadow\`).

Доступно только для **m**, **l** и **full** (toolbar). Для **s** отключено.
      `,
      control: "boolean",
      if: { arg: "size", neq: "s" },
      table: {
        category: "Modal",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    withTitle: {
      description: "Слот `Modal.Header.Title`.",
      control: "boolean",
      table: { category: "Header" },
    },
    withSubtitle: {
      description: "Слот `Modal.Header.Subtitle`.",
      control: "boolean",
      table: { category: "Header" },
    },
    withHeaderBtnBack: {
      description: "Слот `Modal.Header.BtnBack` (иконка «назад» в шапке).",
      control: "boolean",
      table: { category: "Header" },
    },
    withHeaderBtnClose: {
      description: "Слот `Modal.Header.BtnClose`.",
      control: "boolean",
      table: { category: "Header" },
    },
    withFooterBefore: {
      description: "Слот `Modal.Footer.Before`.",
      control: "boolean",
      table: { category: "Footer" },
    },
    withFooterAfter: {
      description: "Слот `Modal.Footer.After`.",
      control: "boolean",
      table: { category: "Footer" },
    },
    withFooterBtnBack: {
      description: "Слот `Modal.Footer.BtnBack`.",
      control: "boolean",
      table: { category: "Footer" },
    },
    withFooterBtnCancel: {
      description: "Слот `Modal.Footer.BtnCancel`.",
      control: "boolean",
      table: { category: "Footer" },
    },
    withFooterBtnConfirm: {
      description: "Слот `Modal.Footer.BtnConfirm`.",
      control: "boolean",
      table: { category: "Footer" },
    },
  },
  args: {
    size: "s",
    footerDirection: "column",
    headerAlign: "center",
    withFooterDivider: false,
    ...defaultModalSlotArgs,
  },
} satisfies Meta<ModalStoryArgs>;

export default meta;

type Story = StoryObj<ModalStoryArgs>;

export const S_Stack: Story = {
  name: "S / Stack",
  args: {
    size: "s",
    footerDirection: "column",
    headerAlign: "center",
    withFooterDivider: false,
    withHeaderBtnBack: false,
    withFooterBefore: false,
    withFooterAfter: false,
    withFooterBtnBack: true,
  },
};

export const S_InlineActions: Story = {
  name: "S / Inline actions",
  args: {
    size: "s",
    footerDirection: "row",
    headerAlign: "center",
    withFooterDivider: false,
    withHeaderBtnBack: false,
    withFooterBtnBack: false,
    withFooterBefore: false,
    withFooterAfter: false,
  },
};

export const M_Toolbar: Story = {
  name: "M / Toolbar",
  args: {
    size: "m",
    footerDirection: "column",
    headerAlign: "center",
    withFooterDivider: true,
    withFooterBtnBack: true,
  },
};

export const HeaderStart: Story = {
  name: "Header align start",
  args: {
    size: "m",
    footerDirection: "column",
    headerAlign: "start",
    withFooterDivider: false,
    withHeaderBtnBack: true,
  },
};

const NestedModalsStoryView = ({
  size,
  footerDirection,
  headerAlign,
  withFooterDivider,
}: ModalStoryArgs) => {
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setFirstOpen(true)}>
        Открыть первое окно
      </button>

      <Modal
        isOpen={firstOpen}
        onClose={() => setFirstOpen(false)}
        size={size}
        footerDirection={footerDirection}
        headerAlign={headerAlign}
        withFooterDivider={withFooterDivider}
      >
        <Modal.Header>
          <Modal.Header.Title>Первое окно</Modal.Header.Title>
          <Modal.Header.Subtitle>
            Отсюда можно открыть второе модальное окно
          </Modal.Header.Subtitle>
          <Modal.Header.BtnClose onClose={() => setFirstOpen(false)} />
        </Modal.Header>

        <Modal.Body>
          <Typography.Paragraph tag="P4 REGULAR">
            Esc и клик по backdrop закрывают только верхнее окно. Первое окно
            остаётся открытым, пока вы его не закроете отдельно.
          </Typography.Paragraph>
          <button
            type="button"
            onClick={() => setSecondOpen(true)}
            style={{ marginTop: 16 }}
          >
            Открыть второе окно
          </button>
        </Modal.Body>

        <Modal.Footer>
          <Modal.Footer.BtnCancel onClick={() => setFirstOpen(false)} />
          <Modal.Footer.BtnConfirm onClick={() => setFirstOpen(false)} />
        </Modal.Footer>
      </Modal>

      <Modal
        isOpen={secondOpen}
        onClose={() => setSecondOpen(false)}
        size="s"
        footerDirection="column"
      >
        <Modal.Header>
          <Modal.Header.Title>Второе окно</Modal.Header.Title>
          <Modal.Header.BtnClose onClose={() => setSecondOpen(false)} />
        </Modal.Header>

        <Modal.Body>
          <Typography.Paragraph tag="P4 REGULAR">
            Это окно поверх первого. Закройте его — первое снова будет доступно.
          </Typography.Paragraph>
        </Modal.Body>

        <Modal.Footer>
          <Modal.Footer.BtnConfirm onClick={() => setSecondOpen(false)} />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const NestedModals: Story = {
  name: "Nested modals",
  render: renderModalStory(NestedModalsStoryView),
  parameters: {
    controls: { include: [...layoutControlsOnly] },
  },
  args: {
    size: "m",
    footerDirection: "column",
    headerAlign: "center",
    withFooterDivider: true,
  },
};

const BtnBackStoryView = ({
  size,
  footerDirection,
  headerAlign,
  withFooterDivider,
}: ModalStoryArgs) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const goToStep = (nextStep: 1 | 2) => setStep(nextStep);

  const handleClose = () => {
    setOpen(false);
    setStep(1);
  };

  const isFirstStep = step === 1;

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Открыть окно
      </button>

      <Modal
        isOpen={open}
        onClose={handleClose}
        size={size}
        footerDirection={footerDirection}
        headerAlign={headerAlign}
        withFooterDivider={withFooterDivider}
      >
        <Modal.Header>
          {!isFirstStep && (
            <Modal.Header.BtnBack onBack={() => goToStep(1)} />
          )}
          <Modal.Header.Title>
            {isFirstStep ? "Шаг 1. Список" : "Шаг 2. Детали"}
          </Modal.Header.Title>
          <Modal.Header.Subtitle>
            {isFirstStep
              ? "Кнопка «Назад» в шапке скрыта"
              : "Кнопка «Назад» возвращает на шаг 1"}
          </Modal.Header.Subtitle>
          <Modal.Header.BtnClose onClose={handleClose} />
        </Modal.Header>

        <Modal.Body>
          {isFirstStep ? (
            <>
              <Typography.Paragraph tag="P4 REGULAR">
                Нажмите «Далее», чтобы перейти ко второму шагу и увидеть
                BtnBack в шапке (M/L/Full) или в футере (S).
              </Typography.Paragraph>
              <button
                type="button"
                onClick={() => goToStep(2)}
                style={{ marginTop: 16 }}
              >
                Далее
              </button>
            </>
          ) : (
            <Typography.Paragraph tag="P4 REGULAR">
              Используйте стрелку «Назад» в шапке или кнопку «Назад» в футере,
              чтобы вернуться к списку.
            </Typography.Paragraph>
          )}
        </Modal.Body>

        <Modal.Footer>
          {!isFirstStep && <Modal.Footer.BtnBack onClick={() => goToStep(1)} />}
          {isFirstStep ? (
            <Modal.Footer.BtnConfirm
              label="Далее"
              onClick={() => goToStep(2)}
            />
          ) : (
            <>
              <Modal.Footer.BtnCancel onClick={handleClose} />
              <Modal.Footer.BtnConfirm onClick={handleClose} />
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const BtnBack: Story = {
  name: "BtnBack / multi-step",
  render: renderModalStory(BtnBackStoryView),
  parameters: {
    controls: { include: [...layoutControlsOnly] },
  },
  args: {
    size: "m",
    footerDirection: "column",
    headerAlign: "center",
    withFooterDivider: true,
  },
};
