import { ButtonHTMLAttributes, HTMLAttributes } from "react";

/**
 * Размер сегментированных табов.
 *
 * - **s** — компактный
 * - **m** — стандартный (по умолчанию)
 * - **l** — крупный, ближе к кнопке размера l
 */
export type TabsButtonSize = "s" | "m" | "l";

/**
 * Как табы ведут себя, если не помещаются в контейнер.
 *
 * - **scroll** — одна строка с горизонтальным скроллом (по умолчанию);
 *   активный пункт доскролливается, чтобы быть виден целиком
 * - **wrap** — перенос на следующую строку
 */
export type TabsButtonOverflow = "scroll" | "wrap";

export interface ITabsButtonProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "defaultValue" | "onChange"
> {
  /** Контролируемое выбранное значение таба. */
  value?: string;
  /** Начальное значение для неконтролируемого режима. */
  defaultValue?: string;
  /** Вызывается при смене активного таба. */
  onValueChange?: (value: string) => void;
  size?: TabsButtonSize;
  overflow?: TabsButtonOverflow;
}

/**
 * Контейнер списка табов (`role="tablist"`).
 * Передайте `aria-label` или `aria-labelledby`, чтобы список имел доступное имя.
 */
export type ITabsButtonListProps = HTMLAttributes<HTMLDivElement>;

type TabsButtonTabNotificationProps =
  | {
      /** Число в бейдже. Значения больше 99 отображаются как 99+. */
      counter?: number;
      notify?: never;
    }
  | {
      counter?: never;
      /** Показывает точку непрочитанного уведомления. */
      notify?: boolean;
    };

export type ITabsButtonTabProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "value"
> &
  TabsButtonTabNotificationProps & {
    /** Уникальный ключ таба, связывается с одноимённой панелью. */
    value: string;
    label: string;
  };

export interface ITabsButtonPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Ключ таба, к которому относится панель. */
  value: string;
}

export interface ITabsButtonContextValue {
  value: string;
  setValue: (value: string) => void;
  size: TabsButtonSize;
  overflow: TabsButtonOverflow;
}
