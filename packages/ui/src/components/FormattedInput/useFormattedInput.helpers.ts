import type {
  FormattedInputSlot,
  FormattedInputSlotContext,
} from "./useFormattedInput.types";

/**
 * Ограничивает длину RAW-значения, если задан `maxLen`.
 *
 * @param raw - Исходное RAW-значение.
 * @param maxLen - Максимальная длина.
 * @returns Ограниченное или исходное значение.
 */
export const limitRawLen = (raw: string, maxLen?: number) => {
  if (!maxLen) return raw;
  return raw.slice(0, maxLen);
};

/**
 * Возвращает текст для ghost-overlay в пустом состоянии.
 *
 * @param isEmpty - Пусто ли текущее RAW-значение.
 * @param showEmptyVisual - Включён ли режим отображения пустого состояния.
 * @param emptyVisual - Текст пустого состояния.
 * @returns Текст для overlay или `null`.
 */
export const getGhostText = (
  isEmpty: boolean,
  showEmptyVisual: boolean,
  emptyVisual: string
) => (isEmpty && showEmptyVisual ? emptyVisual : null);

/**
 * Рендерит suffix-слот при его наличии.
 *
 * @param suffixSlot - Функция рендера слота.
 * @param ctx - Контекст форматированного значения.
 * @returns Контент слота или `null`.
 */
export const getSuffix = (suffixSlot: FormattedInputSlot | undefined, ctx: FormattedInputSlotContext) =>
  suffixSlot ? suffixSlot(ctx) : null;

