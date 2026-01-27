// formattedInput.utils.ts
export type ValueFormatter = (raw: string) => string;
export type ValueParser = (text: string) => string;

/** Берём только цифры */
export const parseDigits: ValueParser = (text) => (text.match(/\d/g) ?? []).join("");

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

/** Нормализация нулей */
export const normalizeLeadingZeros = (rawDigits: string) => {
  const digits = rawDigits.replace(/\D/g, "");
  if (digits.length <= 1) return digits;
  return digits.replace(/^0+/, "") || "0";
};

/** Ограничить длину */
export const limitLen = (s: string, max?: number) => (max ? s.slice(0, max) : s);
