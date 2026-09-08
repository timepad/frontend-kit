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
  /** Идентификатор активного таба в контролируемом режиме. */
  activeTabId?: string;
  /** Идентификатор изначально активного таба в неконтролируемом режиме. */
  defaultActiveTabId?: string;
  /** Вызывается при смене активного таба. */
  onActiveTabChange?: (tabId: string) => void;
  size?: TabsButtonSize;
}

/**
 * Контейнер списка табов (`role="tablist"`).
 * Передайте `aria-label` или `aria-labelledby`, чтобы список имел доступное имя.
 */
export interface ITabsButtonListProps extends HTMLAttributes<HTMLDivElement> {
  /** Поведение списка при переполнении. По умолчанию — scroll. */
  overflow?: TabsButtonOverflow;
}

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
    /** Уникальный идентификатор таба, связывается с панелью с таким же tabId. */
    tabId: string;
    label: string;
  };

export interface ITabsButtonPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Ключ таба, к которому относится панель. */
  tabId: string;
}

export interface ITabsButtonContextValue {
  activeTabId: string;
  setActiveTabId: (tabId: string) => void;
  size: TabsButtonSize;
}
