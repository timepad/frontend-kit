import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

/**
 * Семантический вариант баннера.
 *
 * Управляет:
 * - цветовыми акцентами (иконка / текст в зависимости от стилей)
 * - визуальным смыслом сообщения (info / warning / error / success)
 *
 * В `TertiaryBannerBase` также используется для применения
 * модификатора варианта к иконке.
 */
export type TertiaryBannerVariant = "info" | "warning" | "error" | "success";

/**
 * Модификатор темы баннера.
 *
 * - **base** — базовый (светлый) стиль
 * - **inverted** — инвертированный (тёмный) стиль,
 *   предназначенный для использования на тёмных фонах
 */
export type Appearance = "base" | "inverted";

export interface ITertiaryBannerBaseProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  variant?: TertiaryBannerVariant;
  appearance?: Appearance;
  icon?: ReactNode;
  children: ReactNode;
}

export interface ITertiaryBannerVariantProps extends Omit<
  ITertiaryBannerBaseProps,
  "variant" | "icon"
> {}
