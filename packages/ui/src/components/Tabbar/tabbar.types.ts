import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
} from "react";

export interface ITabbarProps extends HTMLAttributes<HTMLDivElement> {
  /** Вкладки Tabbar. По дизайну поддерживается от 3 до 5 вкладок. */
  children: ReactNode;
  /** Пользовательский цвет фона. По умолчанию используется --bg-primary. */
  backgroundColor?: string;
  /** Показывает подписи у всех вкладок. */
  showLabels?: boolean;
  /** Добавляет тень для Tabbar, закреплённого над прокручиваемым контентом. */
  shadow?: boolean;
}

type TabNotificationProps =
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

export type ITabProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> &
  TabNotificationProps & {
    /** Иконка размером 24px. */
    icon: ReactNode;
    /** Подпись вкладки и её доступное имя. */
    label: string;
    /** Активной может быть только одна вкладка. */
    active?: boolean;
  };
