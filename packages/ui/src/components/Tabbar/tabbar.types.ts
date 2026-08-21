import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";

export type ITabbarProps = Omit<ComponentPropsWithoutRef<"nav">, "children"> & {
  /** Вкладки Tabbar. По дизайну поддерживается от 3 до 5 вкладок. */
  children: ReactNode;
  /** Пользовательский цвет фона. По умолчанию используется --bg-primary. */
  backgroundColor?: string;
  /** Показывает подписи у всех вкладок. */
  showLabels?: boolean;
  /** Добавляет тень для Tabbar, закреплённого над прокручиваемым контентом. */
  shadow?: boolean;
};

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

type ITabCommonProps = TabNotificationProps & {
  /** Иконка размером 24px. */
  icon: ReactNode;
  /** Подпись вкладки и её доступное имя. */
  label: string;
  /** Активной может быть только одна вкладка. */
  active?: boolean;
};

export type ITabButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> &
  ITabCommonProps & {
    /** По умолчанию вкладка рендерится как кнопка. */
    as?: "button";
  };

export type ITabLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "children"
> &
  ITabCommonProps & {
    /** Используйте ссылку, когда вкладка ведёт на отдельный URL. */
    as: "a";
    href: string;
  };

export type ITabProps = ITabButtonProps | ITabLinkProps;
