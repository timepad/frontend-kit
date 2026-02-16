export type ValueFormatter = (raw: string) => string;
export type ValueParser = (text: string) => string;

/**
 * Извлекает из строки только цифры и объединяет их в одну строку.
 *
 * @param text - Исходный текст, который может содержать любые символы.
 * @returns Строка, состоящая только из цифр в исходном порядке.
 */
export const parseDigits: ValueParser = (text) => (text.match(/\d/g) ?? []).join("");

/**
 * Форматирует строку с цифрами, добавляя разделитель разрядов тысяч.
 * Нецифровые символы из входного значения предварительно удаляются.
 *
 * @param rawDigits - Исходная строка с числом (может содержать нецифровые символы).
 * @param sep - Разделитель между группами по 3 цифры. По умолчанию пробел.
 * @returns Отформатированная строка или пустая строка, если цифр нет.
 */
export const formatThousands = (rawDigits: string, sep = " ") => {
  const digits = rawDigits.replace(/\D/g, "");
  if (!digits) return "";

  const rev = digits.split("").reverse();
  const out: string[] = [];
  for (let i = 0; i < rev.length; i++) {
    if (i > 0 && i % 3 === 0) out.push(sep);
    out.push(rev[i]);
  }
  return out.reverse().join("");
};

/**
 * Нормализует ведущие нули в числовой строке.
 * Нецифровые символы удаляются перед обработкой.
 *
 * @param rawDigits - Исходная строка со значением.
 * @returns Строка без лишних ведущих нулей; для нулевого значения возвращает "0".
 */
export const normalizeLeadingZeros = (rawDigits: string) => {
  const digits = rawDigits.replace(/\D/g, "");
  if (digits.length <= 1) return digits;
  return digits.replace(/^0+/, "") || "0";
};

/**
 * Ограничивает длину строки заданным максимумом.
 *
 * @param s - Исходная строка.
 * @param max - Максимальная длина. Если не задана, строка возвращается без изменений.
 * @returns Строка, обрезанная до max символов, либо исходная строка.
 */
export const limitLen = (s: string, max?: number) => (max ? s.slice(0, max) : s);
