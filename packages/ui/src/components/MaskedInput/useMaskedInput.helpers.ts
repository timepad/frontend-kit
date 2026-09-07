import type {
  PlaceholderConfig,
  SlotType,
  SmartPasteDetector,
  Token,
  VisualToken,
} from "./useMaskedInput.types";

/**
 * Специальный символ для кодирования «пустого слота» внутри `input.value`.
 * Используется вместо placeholder, чтобы не конфликтовать с валидными символами (например, `0`).
 */
export const EMPTY_SLOT_CHAR = "\u2007";

/**
 * Базовая стратегия для режима smart-вставки.
 */
export const defaultSmartPasteDetector: SmartPasteDetector = ({ maxLen, digitsOnly, raw }) => {
  if (digitsOnly.length >= Math.max(2, maxLen - 1)) return "overwrite";
  if (raw.length === 0 && digitsOnly.length > 0) return "overwrite";
  return "shift";
};

/** Возвращает placeholder для конкретного слота маски. */
export const resolvePlaceholder = (
  placeholders: PlaceholderConfig | undefined,
  slot: SlotType,
  maskPos: number,
  tokenIndex: number
) => {
  const fallback = "_";
  if (!placeholders) return fallback;
  if (typeof placeholders === "string") return placeholders;
  if (typeof placeholders === "function") return placeholders({ slot, maskPos, tokenIndex });
  return placeholders[slot] ?? fallback;
};

/** Парсит строку маски в токены слотов и литералов. */
export const parseMask = (mask: string, placeholders?: PlaceholderConfig): Token[] => {
  const out: Token[] = [];
  let esc = false;
  let maskPos = 0;

  for (let i = 0; i < mask.length; i++) {
    const ch = mask[i];

    if (esc) {
      out.push({ type: "lit", char: ch });
      esc = false;
      maskPos += 1;
      continue;
    }

    if (ch === "\\") {
      esc = true;
      continue;
    }

    if (ch === "9") {
      out.push({
        type: "slot",
        slot: "digit",
        placeholder: resolvePlaceholder(placeholders, "digit", maskPos, out.length),
      });
      maskPos += 1;
      continue;
    }

    if (ch === "A") {
      out.push({
        type: "slot",
        slot: "letter",
        placeholder: resolvePlaceholder(placeholders, "letter", maskPos, out.length),
      });
      maskPos += 1;
      continue;
    }

    if (ch === "*") {
      out.push({
        type: "slot",
        slot: "any",
        placeholder: resolvePlaceholder(placeholders, "any", maskPos, out.length),
      });
      maskPos += 1;
      continue;
    }

    out.push({ type: "lit", char: ch });
    maskPos += 1;
  }

  return out;
};

/** Возвращает число редактируемых слотов в маске. */
export const maxRawLen = (tokens: Token[]) => tokens.filter((t) => t.type === "slot").length;

/** Проверяет символ на соответствие типу слота. */
export const match = (slot: SlotType, ch: string) => {
  if (slot === "digit") return /[0-9]/.test(ch);
  if (slot === "letter") return /[a-zA-Z]/.test(ch);
  return ch !== " ";
};

/** Формирует masked-значение для `input.value` из RAW-строки. */
export const applyForInputValue = (raw: string, tokens: Token[]) => {
  let ri = 0;
  let res = "";

  for (const t of tokens) {
    if (t.type === "lit") {
      res += t.char;
    } else {
      const c = raw[ri];
      if (c !== undefined && match(t.slot, c)) {
        res += c;
        ri += 1;
      } else {
        res += EMPTY_SLOT_CHAR;
      }
    }
  }

  return res;
};

/** Строит токены для визуального overlay-слоя. */
export const buildVisualTokens = (tokens: Token[], raw: string): VisualToken[] => {
  const boundaryPos = caretFromRawLen(raw.length, tokens);
  let rawIdx = 0;

  return tokens.map((t, maskPos) => {
    if (t.type === "lit") {
      const filled = maskPos < boundaryPos;
      return { char: t.char, filled };
    }

    const char = raw[rawIdx];
    if (char !== undefined) {
      rawIdx += 1;
      return { char, filled: true };
    }

    return { char: t.placeholder, filled: false };
  });
};

/** Извлекает RAW-значение из masked-строки `input.value`. */
export const extractRawFromInputValue = (masked: string, tokens: Token[]) => {
  let res = "";
  let mi = 0;

  for (const t of tokens) {
    const ch = masked[mi];
    if (ch === undefined) break;

    if (t.type === "lit") {
      mi += 1;
      continue;
    }

    if (ch === EMPTY_SLOT_CHAR) {
      mi += 1;
      continue;
    }

    if (match(t.slot, ch)) res += ch;
    mi += 1;
  }

  return res;
};

export const isSlotPos = (maskPos: number, tokens: Token[]) => tokens[maskPos]?.type === "slot";

export const nextSlotPos = (fromPos: number, tokens: Token[]) => {
  for (let p = Math.max(0, fromPos); p < tokens.length; p++) {
    if (tokens[p]?.type === "slot") return p;
  }
  return tokens.length;
};

export const prevSlotPos = (fromPos: number, tokens: Token[]) => {
  for (let p = Math.min(fromPos, tokens.length - 1); p >= 0; p--) {
    if (tokens[p]?.type === "slot") return p;
  }
  return -1;
};

export const rawIndexFromMaskPos = (maskPos: number, tokens: Token[]) => {
  let rawIdx = 0;
  let pos = 0;
  for (const t of tokens) {
    if (pos >= maskPos) break;
    if (t.type === "slot") rawIdx += 1;
    pos += 1;
  }
  return rawIdx;
};

export const caretFromRawLen = (rawLen: number, tokens: Token[]) => {
  let rawCount = 0;
  let pos = 0;
  for (const t of tokens) {
    if (t.type === "slot") {
      if (rawCount >= rawLen) return pos;
      rawCount += 1;
      pos += 1;
    } else pos += 1;
  }
  return pos;
};

export const normalizeRuPhoneDigitsForSlots = (input: string, slotsCount: number) => {
  let digits = (input.match(/\d/g) ?? []).join("");
  if (!digits) return "";

  if (digits.length > 11) digits = digits.slice(-11);
  if (digits.length === 11 && (digits[0] === "8" || digits[0] === "7")) digits = digits.slice(1);
  if (digits.length > slotsCount) digits = digits.slice(-slotsCount);

  return digits.slice(0, slotsCount);
};

export const isRuPhoneMask = (mask: string, slotsCount: number) =>
  mask.includes("+7") && slotsCount === 10;

/** Вставка в режиме overwrite: заменяет символы по индексам слотов без сдвига хвоста. */
export const overwriteIntoRaw = (
  baseRaw: string,
  insertText: string,
  tokens: Token[],
  rawStartIdx: number,
  maxLen: number
) => {
  const slots = tokens.filter((t): t is Extract<Token, { type: "slot" }> => t.type === "slot");

  const rawArr = baseRaw.split("");
  let idx = rawStartIdx;

  for (const ch of insertText) {
    const slot = slots[idx];
    if (!slot) break;
    if (!match(slot.slot, ch)) continue;

    if (idx < rawArr.length) rawArr[idx] = ch;
    else rawArr.push(ch);

    idx += 1;
  }

  const nextRaw = rawArr.join("").slice(0, maxLen);
  return { nextRaw, nextCaretRaw: Math.min(idx, maxLen) };
};

/** Вставка в режиме shift: вставляет символы и сдвигает хвост вправо. */
export const insertIntoRaw = (
  baseRaw: string,
  insertText: string,
  tokens: Token[],
  rawStartIdx: number,
  maxLen: number
) => {
  const slots = tokens.filter((t): t is Extract<Token, { type: "slot" }> => t.type === "slot");

  let filtered = "";
  let idx = rawStartIdx;

  for (const ch of insertText) {
    const slot = slots[idx];
    if (!slot) break;
    if (!match(slot.slot, ch)) continue;
    filtered += ch;
    idx += 1;
  }

  if (!filtered) return { nextRaw: baseRaw, nextCaretRaw: rawStartIdx };

  const nextRaw = (baseRaw.slice(0, rawStartIdx) + filtered + baseRaw.slice(rawStartIdx)).slice(
    0,
    maxLen
  );

  return { nextRaw, nextCaretRaw: Math.min(rawStartIdx + filtered.length, maxLen) };
};

/** Извлекает из текста только цифры. */
export const digitsOnly = (text: string) => (text.match(/\d/g) ?? []).join("");
