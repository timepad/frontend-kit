import {
  DetailedHTMLProps,
  HTMLAttributes,
  LegacyRef,
  ReactHTML,
  ReactNode,
} from "react";

/**
 * Высокоуровневые варианты типографики,
 * используемые базовым компонентом.
 *
 * Каждый вариант имеет собственные допустимые комбинации:
 * - размера текста
 * - типа шрифта
 * - начертания (fontWeight)
 */
export type TypographyVariant = "lead" | "header" | "paragraph" | "caption";

/**
 * Поддерживаемые варианты начертания шрифта.
 *
 * - **bold** — максимальный акцент
 * - **semi-bold** — средний акцент
 * - **medium** — стандартный акцент
 * - **regular** — базовый (обычный) текст
 */
export type FontWeight = "bold" | "semi-bold" | "medium" | "regular";

/**
 * Предустановленные типы шрифтов дизайн-системы.
 *
 * - **accent** — акцентный шрифт (TT Backwards Sans)
 * - **regular** — основной системный шрифт (Inter)
 */
export type FontType = "accent" | "regular";

/**
 * Уровни размера текста.
 *
 * - **1** — самый крупный текст
 * - **2** — средний размер
 * - **3** — маленький размер
 * - **4** — самый мелкий текст
 */
export type Size = 1 | 2 | 3 | 4;

export interface ILeadVariant {
  variant: Extract<TypographyVariant, "lead">;
  size: Exclude<Size, 4>;
  fontType: Extract<FontType, "accent">;
  fontWeight: Extract<FontWeight, "bold">;
}

export interface IHeaderVariant {
  variant: Extract<TypographyVariant, "header">;
  size: Size;
  fontType: FontType;
  fontWeight: Extract<FontWeight, "bold" | "medium">;
}

export interface IParagraphVariant {
  variant: Extract<TypographyVariant, "paragraph">;
  size: Size;
  fontType: Extract<FontType, "regular">;
  fontWeight: Exclude<FontWeight, "medium">;
}

export interface ICaptionVariant {
  variant: Extract<TypographyVariant, "caption">;
  size: Extract<Size, 1>;
  fontType: Extract<FontType, "regular">;
  fontWeight: Exclude<FontWeight, "medium">;
}

/**
 * Общие props для всех компонентов Typography.
 *
 * Включает:
 * - **children** — отображаемый контент
 * - **as** — HTML-тег, который будет отрендерен (span, p, h1 и т.д.)
 * - **innerRef** — ref, пробрасываемый к DOM-элементу
 * - **uppercase** — приводит текст к верхнему регистру
 *
 * Также наследует все стандартные HTML-атрибуты
 * (id, className, onClick и т.д.).
 */
export interface ITypographyCommonProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> {
  children: ReactNode;
  as?: keyof ReactHTML;
  innerRef?: LegacyRef<HTMLElement>;
  uppercase?: boolean;
}

export type ITypographyBaseProps = ITypographyCommonProps &
  (ILeadVariant | IHeaderVariant | IParagraphVariant | ICaptionVariant);
