import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  MouseEvent,
} from "react";

export interface IBreadcrumbItem {
  label: ReactNode;
  href?: string;
  /**
   * Явно помечает элемент как текущую страницу.
   *
   * Если не задано, последнему элементу автоматически
   * присваивается статус текущей страницы (если элементов больше одного).
   */
  isCurrent?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export interface IBreadcrumbsProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  /** Ordered list of breadcrumb items. */
  items: IBreadcrumbItem[];
  /**
   * Определяет визуальный и поведенческий режим компонента Breadcrumbs.
   *
   * - **default** — стандартная иерархия хлебных крошек:
   *   - отображает список элементов, разделённых, например, символом «›»
   *   - промежуточные элементы являются ссылками
   *   - последний элемент по умолчанию считается текущей страницей
   *
   * - **backstep** — одноуровневый режим «вернуться назад»:
   *   - отображает только первый элемент как ссылку со стрелкой влево
   *   - используется на страницах без видимой иерархии хлебных крошек,
   *     но где необходимо предоставить пользователю возможность вернуться
   *     на предыдущий экран или в родительский раздел
   */
  type?: "default" | "backstep";
}
