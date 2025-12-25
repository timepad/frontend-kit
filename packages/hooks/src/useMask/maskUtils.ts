export type MaskToken =
  | { type: "slot"; slotType: "digit" | "letter" | "any"; placeholder: string }
  | { type: "literal"; char: string };

export const DIGIT_SLOT = "9";
export const LETTER_SLOT = "A";
export const ANY_SLOT = "*";

export const parseMask = (mask: string): MaskToken[] => {
  const tokens: MaskToken[] = [];
  let escape = false;

  for (const ch of mask) {
    if (escape) {
      tokens.push({ type: "literal", char: ch });
      escape = false;
      continue;
    }
    if (ch === "\\") {
      escape = true;
      continue;
    }

    if (ch === DIGIT_SLOT) {
      tokens.push({
        type: "slot",
        slotType: "digit",
        placeholder: "_",
      });
    } else if (ch === LETTER_SLOT) {
      tokens.push({
        type: "slot",
        slotType: "letter",
        placeholder: "_",
      });
    } else if (ch === ANY_SLOT) {
      tokens.push({
        type: "slot",
        slotType: "any",
        placeholder: "_",
      });
    } else {
      tokens.push({ type: "literal", char: ch });
    }
  }

  return tokens;
};

export const maxRawLength = (tokens: MaskToken[]): number =>
  tokens.filter((t) => t.type === "slot").length;

export const matchSlotChar = (
  slotType: "digit" | "letter" | "any",
  ch: string,
) => {
  if (slotType === "digit") return /[0-9]/.test(ch);
  if (slotType === "letter") return /[a-zA-Z]/.test(ch);
  return ch !== " ";
};

export const applyMaskToRaw = (raw: string, tokens: MaskToken[]): string => {
  let rawIndex = 0;
  let result = "";

  for (const token of tokens) {
    if (token.type === "literal") {
      result += token.char;
    } else {
      const nextChar = raw[rawIndex];
      if (nextChar && matchSlotChar(token.slotType, nextChar)) {
        result += nextChar;
        rawIndex += 1;
      } else {
        result += token.placeholder;
      }
    }
  }

  return result;
};

/** достаём сырое значение из замаскированной строки */
export const extractRaw = (masked: string, tokens: MaskToken[]): string => {
  let raw = "";
  let i = 0;

  for (const token of tokens) {
    if (token.type === "slot") {
      const ch = masked[i];
      if (!ch) break;
      if (matchSlotChar(token.slotType, ch)) {
        raw += ch;
      }
      i += 1;
    } else {
      if (masked[i] === token.char) {
        i += 1;
      }
    }
  }

  return raw;
};

/** позиция каретки после ввода rawLen символов */
export const caretPosFromRawLength = (
  rawLen: number,
  tokens: MaskToken[],
): number => {
  let rawCount = 0;
  let pos = 0;

  for (const token of tokens) {
    if (token.type === "slot") {
      if (rawCount >= rawLen) return pos;
      rawCount += 1;
      pos += 1;
    } else {
      pos += 1;
    }
  }
  return pos;
};

/** индекс в raw по позиции каретки в маске */
export const rawIndexFromMaskedPos = (
  maskedPos: number,
  tokens: MaskToken[],
): number => {
  let rawIndex = 0;
  let pos = 0;

  for (const token of tokens) {
    if (pos >= maskedPos) break;
    if (token.type === "slot") {
      rawIndex += 1;
    }
    pos += 1;
  }

  return rawIndex;
};

/** маска полностью заполнена? */
export const isMaskComplete = (raw: string, tokens: MaskToken[]): boolean =>
  raw.length >= maxRawLength(tokens);
