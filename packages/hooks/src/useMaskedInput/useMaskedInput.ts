import { useLayoutEffect, useMemo, useRef } from "react";

type SlotType = "digit" | "letter" | "any";
type Token =
  | { type: "slot"; slot: SlotType; placeholder: string }
  | { type: "lit"; char: string };

export type VisualToken = { char: string; filled: boolean };

type PlaceholderConfig =
  | string
  | Partial<Record<SlotType, string>>
  | ((ctx: { slot: SlotType; maskPos: number; tokenIndex: number }) => string);

// ВАЖНО: placeholder слота может быть валидным символом (например "0").
// Поэтому в value инпута пустые слоты кодируем отдельным символом,
// а placeholder рисуем только в overlay.
const EMPTY_SLOT_CHAR = "\u2007"; // figure space

type EditMode = "shift" | "overwrite";
type PasteMode = "shift" | "overwrite" | "smart";

type SmartPasteCtx = {
  mask: string;
  tokens: Token[];
  maxLen: number; // slots count
  digitsOnly: string; // extracted digits from clipboard
  raw: string; // current raw
};

type SmartPasteDetector = (ctx: SmartPasteCtx) => "shift" | "overwrite";

const defaultSmartPasteDetector: SmartPasteDetector = ({ maxLen, digitsOnly, raw }) => {
  // если вставляют почти полный набор слотов (или больше) — это "полная вставка"
  // и логичнее overwrite с начала/позиции.
  if (digitsOnly.length >= Math.max(2, maxLen - 1)) return "overwrite";
  // если поле пустое — overwrite тоже выглядит ожидаемо
  if (raw.length === 0 && digitsOnly.length > 0) return "overwrite";
  return "shift";
};

const resolvePlaceholder = (
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

const parseMask = (mask: string, placeholders?: PlaceholderConfig): Token[] => {
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

const maxRawLen = (tokens: Token[]) => tokens.filter((t) => t.type === "slot").length;

const match = (slot: SlotType, ch: string) => {
  if (slot === "digit") return /[0-9]/.test(ch);
  if (slot === "letter") return /[a-zA-Z]/.test(ch);
  return ch !== " ";
};

// value для input: литералы как есть, заполненные слоты — символ,
// пустые слоты — EMPTY_SLOT_CHAR (а не placeholder!)
const applyForInputValue = (raw: string, tokens: Token[]) => {
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

// placeholder для overlay: литералы как есть, пустые слоты — token.placeholder
const buildVisualTokens = (tokens: Token[], raw: string): VisualToken[] => {
  const boundaryPos = caretFromRawLen(raw.length, tokens);
  let rawIdx = 0;

  return tokens.map((t, maskPos) => {
    if (t.type === "lit") {
      //const filled = raw.length > 0 && maskPos < boundaryPos;
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

// корректное извлечение raw из input.value: литералы пропускаем,
// пустые слоты (EMPTY_SLOT_CHAR) игнорируем
const extractRawFromInputValue = (masked: string, tokens: Token[]) => {
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

const isSlotPos = (maskPos: number, tokens: Token[]) => tokens[maskPos]?.type === "slot";

const nextSlotPos = (fromPos: number, tokens: Token[]) => {
  for (let p = Math.max(0, fromPos); p < tokens.length; p++) {
    if (tokens[p]?.type === "slot") return p;
  }
  return tokens.length;
};

const prevSlotPos = (fromPos: number, tokens: Token[]) => {
  for (let p = Math.min(fromPos, tokens.length - 1); p >= 0; p--) {
    if (tokens[p]?.type === "slot") return p;
  }
  return -1;
};

const rawIndexFromMaskPos = (maskPos: number, tokens: Token[]) => {
  let rawIdx = 0;
  let pos = 0;
  for (const t of tokens) {
    if (pos >= maskPos) break;
    if (t.type === "slot") rawIdx += 1;
    pos += 1;
  }
  return rawIdx;
};

const caretFromRawLen = (rawLen: number, tokens: Token[]) => {
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

const normalizeRuPhoneDigitsForSlots = (input: string, slotsCount: number) => {
  let digits = (input.match(/\d/g) ?? []).join("");
  if (!digits) return "";

  if (digits.length > 11) digits = digits.slice(-11);
  if (digits.length === 11 && (digits[0] === "8" || digits[0] === "7")) digits = digits.slice(1);
  if (digits.length > slotsCount) digits = digits.slice(-slotsCount);

  return digits.slice(0, slotsCount);
};

const isRuPhoneMask = (mask: string, slotsCount: number) =>
  mask.includes("+7") && slotsCount === 10;

// overwrite: заменяем по индексу слота, без сдвига хвоста
const overwriteIntoRaw = (
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

// insert-with-shift: вставляем и сдвигаем хвост вправо
const insertIntoRaw = (
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

const digitsOnly = (text: string) => (text.match(/\d/g) ?? []).join("");

export const useMaskedInput = (params: {
  mask: string;
  /** RAW value по умолчанию */
  value: string;
  /** change отдаёт RAW value */
  onValueChange: (v: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
  /** Кастомные плейсхолдеры (только для overlay) */
  placeholders?: PlaceholderConfig;
  /** Если наружу нужно отдавать masked (редко) */
  returnMasked?: boolean;

  /** Режим ввода символов с клавиатуры */
  inputMode?: EditMode; // default: "shift"
  /** Режим вставки */
  pasteMode?: PasteMode; // default: "smart"
  /** Детектор для smart paste */
  smartPasteDetector?: SmartPasteDetector;
}) => {
  const {
    mask,
    value,
    onValueChange,
    disabled,
    readOnly,
    placeholders,
    returnMasked,

    inputMode = "shift",
    pasteMode = "smart",
    smartPasteDetector = defaultSmartPasteDetector,
  } = params;

  const tokens = useMemo(() => parseMask(mask, placeholders), [mask, placeholders]);
  const maxLen = useMemo(() => maxRawLen(tokens), [tokens]);
  const maskedLen = tokens.length;

  const raw = useMemo(() => {
    const v = String(value ?? "");
    const r = returnMasked ? extractRawFromInputValue(v, tokens) : v;
    return r.slice(0, maxLen);
  }, [value, returnMasked, tokens, maxLen]);

  const maskedValue = useMemo(() => applyForInputValue(raw, tokens), [raw, tokens]);
  const visualTokens = useMemo(() => buildVisualTokens(tokens, raw), [tokens, raw]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const pendingCaretMaskPos = useRef<number | null>(null);

  const rawRef = useRef(raw);
  rawRef.current = raw;

  const setCaretToSlotRight = (el: HTMLInputElement, preferredMaskPos: number) => {
    const clamped = Math.max(0, Math.min(preferredMaskPos, maskedLen));
    const slotPos = isSlotPos(clamped, tokens) ? clamped : nextSlotPos(clamped, tokens);
    const finalPos = Math.min(slotPos, maskedLen);
    el.setSelectionRange(finalPos, finalPos);
  };

  const snapCaret = (el: HTMLInputElement) => {
    const s = el.selectionStart ?? 0;
    if (s >= maskedLen) {
      setCaretToSlotRight(el, caretFromRawLen(rawRef.current.length, tokens));
      return;
    }
    setCaretToSlotRight(el, s);
  };

  useLayoutEffect(() => {
    if (
      pendingCaretMaskPos.current != null &&
      inputRef.current &&
      document.activeElement === inputRef.current
    ) {
      setCaretToSlotRight(inputRef.current, pendingCaretMaskPos.current);
      pendingCaretMaskPos.current = null;
    }
  }, [maskedValue, tokens]);

  const emit = (nextRaw: string, caretRawLen?: number) => {
    const limited = nextRaw.slice(0, maxLen);
    const caretMaskPos = caretFromRawLen(caretRawLen ?? limited.length, tokens);
    pendingCaretMaskPos.current = caretMaskPos;
    onValueChange(returnMasked ? applyForInputValue(limited, tokens) : limited);
  };

  const deleteSelection = (curRaw: string, s: number, t: number) => {
    const a = rawIndexFromMaskPos(s, tokens);
    const b = rawIndexFromMaskPos(t, tokens);
    const next = curRaw.slice(0, a) + curRaw.slice(b);
    return { nextRaw: next, caretRaw: a };
  };

  // caret management
  const onFocusMasked: React.FocusEventHandler<HTMLInputElement> = (e) => {
    if (disabled || readOnly) return;
    setCaretToSlotRight(e.currentTarget, caretFromRawLen(rawRef.current.length, tokens));
  };

  const onClickMasked: React.MouseEventHandler<HTMLInputElement> = (e) => {
    if (disabled || readOnly) return;
    const el = e.currentTarget;
    queueMicrotask(() => {
      if (document.activeElement === el) snapCaret(el);
    });
  };

  const applyEditMode = (
    mode: EditMode,
    baseRaw: string,
    text: string,
    rawStartIdx: number
  ) => {
    if (mode === "overwrite") {
      return overwriteIntoRaw(baseRaw, text, tokens, rawStartIdx, maxLen);
    }
    return insertIntoRaw(baseRaw, text, tokens, rawStartIdx, maxLen);
  };

  const decidePasteMode = (clipboardText: string) => {
    if (pasteMode !== "smart") return pasteMode;

    const d = digitsOnly(clipboardText);
    return smartPasteDetector({
      mask,
      tokens,
      maxLen,
      digitsOnly: d,
      raw: rawRef.current,
    });
  };

  // MAIN typing path (desktop)
  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (disabled || readOnly) return;

    // не ломаем ctrl/cmd/alt комбинации
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    const el = e.currentTarget;
    const s = el.selectionStart ?? 0;
    const t = el.selectionEnd ?? 0;
    const curRaw = rawRef.current;

    const deleteRange = () => {
      const del = deleteSelection(curRaw, s, t);
      emit(del.nextRaw, del.caretRaw);
    };

    // printable
    if (e.key.length === 1) {
      let caretPos = s >= maskedLen ? caretFromRawLen(curRaw.length, tokens) : s;
      if (!isSlotPos(caretPos, tokens)) caretPos = nextSlotPos(caretPos, tokens);
      if (caretPos >= maskedLen) return;

      const slot = tokens[caretPos];
      if (!slot || slot.type !== "slot") return;

      if (!match(slot.slot, e.key)) {
        e.preventDefault();
        return;
      }

      e.preventDefault();

      let baseRaw = curRaw;
      let rawStartIdx = rawIndexFromMaskPos(caretPos, tokens);

      if (s !== t) {
        const del = deleteSelection(curRaw, s, t);
        baseRaw = del.nextRaw;
        rawStartIdx = del.caretRaw;
      }

      const { nextRaw, nextCaretRaw } = applyEditMode(
        inputMode,
        baseRaw,
        e.key,
        Math.min(rawStartIdx, baseRaw.length)
      );

      emit(nextRaw, nextCaretRaw);
      return;
    }

    if (e.key === "Backspace") {
      e.preventDefault();

      if (s !== t) {
        deleteRange();
        return;
      }

      if (s === 0) return;

      let pos = s - 1;
      if (!isSlotPos(pos, tokens)) pos = prevSlotPos(pos, tokens);
      if (pos < 0) return;

      const rawIdx = rawIndexFromMaskPos(pos + 1, tokens) - 1;
      if (rawIdx < 0 || rawIdx >= curRaw.length) return;

      emit(curRaw.slice(0, rawIdx) + curRaw.slice(rawIdx + 1), rawIdx);
      return;
    }

    if (e.key === "Delete") {
      e.preventDefault();

      if (s !== t) {
        deleteRange();
        return;
      }

      let pos = s;
      if (!isSlotPos(pos, tokens)) pos = nextSlotPos(pos, tokens);
      if (pos >= maskedLen) return;

      const rawIdx = rawIndexFromMaskPos(pos, tokens);
      if (rawIdx < 0 || rawIdx >= curRaw.length) return;

      emit(curRaw.slice(0, rawIdx) + curRaw.slice(rawIdx + 1), rawIdx);
      return;
    }
  };

  // paste: режим + RU нормализация для phone
  const onPaste: React.ClipboardEventHandler<HTMLInputElement> = (e) => {
    if (disabled || readOnly) return;

    const el = e.currentTarget;
    snapCaret(el);

    const s = el.selectionStart ?? 0;
    const t = el.selectionEnd ?? 0;

    const clipboardText = e.clipboardData?.getData("text") ?? "";
    if (!clipboardText) return;

    e.preventDefault();

    const curRaw = rawRef.current;

    let baseRaw = curRaw;
    let caretMaskPos = s;

    if (s !== t) {
      const del = deleteSelection(curRaw, s, t);
      baseRaw = del.nextRaw;
      caretMaskPos = caretFromRawLen(del.caretRaw, tokens);
    }

    if (!isSlotPos(caretMaskPos, tokens)) caretMaskPos = nextSlotPos(caretMaskPos, tokens);
    if (caretMaskPos >= maskedLen) return;

    const rawStartIdx = Math.min(rawIndexFromMaskPos(caretMaskPos, tokens), baseRaw.length);

    // normalize
    const ruPhone = isRuPhoneMask(mask, maxLen);
    const normalized = ruPhone
      ? normalizeRuPhoneDigitsForSlots(clipboardText, maxLen)
      : clipboardText;

    const mode = decidePasteMode(clipboardText);
    const { nextRaw, nextCaretRaw } = applyEditMode(mode, baseRaw, normalized, rawStartIdx);
    emit(nextRaw, nextCaretRaw);
  };

  // beforeinput fallback for mobile paste/replacement; не трогаем обычный insertText
  const onBeforeInput: React.FormEventHandler<HTMLInputElement> = (e) => {
    if (disabled || readOnly) return;

    const native = e.nativeEvent as InputEvent | undefined;
    if (!native) return;

    if ((native as any).isComposing) return;

    const inputType = native.inputType;
    const data = (native as any).data as string | null | undefined;

    if (
      (inputType === "insertFromPaste" || inputType === "insertReplacementText") &&
      typeof data === "string" &&
      data.length > 0
    ) {
      e.preventDefault();

      const el = e.currentTarget;
      snapCaret(el);

      const s = el.selectionStart ?? 0;
      const t = el.selectionEnd ?? 0;

      const curRaw = rawRef.current;

      let baseRaw = curRaw;
      let caretMaskPos = s;

      if (s !== t) {
        const del = deleteSelection(curRaw, s, t);
        baseRaw = del.nextRaw;
        caretMaskPos = caretFromRawLen(del.caretRaw, tokens);
      }

      if (!isSlotPos(caretMaskPos, tokens)) caretMaskPos = nextSlotPos(caretMaskPos, tokens);
      if (caretMaskPos >= maskedLen) return;

      const rawStartIdx = Math.min(rawIndexFromMaskPos(caretMaskPos, tokens), baseRaw.length);

      const ruPhone = isRuPhoneMask(mask, maxLen);
      const normalized = ruPhone ? normalizeRuPhoneDigitsForSlots(data, maxLen) : data;

      const mode = decidePasteMode(data);
      const { nextRaw, nextCaretRaw } = applyEditMode(mode, baseRaw, normalized, rawStartIdx);
      emit(nextRaw, nextCaretRaw);
    }
  };

  // fallback: если браузер поменял value — вытаскиваем raw из input.value
  const onChangeMasked: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (disabled || readOnly) return;
    const nextRaw = extractRawFromInputValue(e.target.value, tokens);
    emit(nextRaw);
  };

  const clear = () => {
    if (disabled || readOnly) return;
    emit("", 0);
  };

  return {
    inputRef,
    rawValue: raw,
    maskedValue,
    visualTokens,

    onFocusMasked,
    onClickMasked,

    onKeyDown,
    onBeforeInput,
    onPaste,
    onChangeMasked,

    clear,
    maskedMaxLength: maskedLen,

    // полезно для внешней валидации/UX
    isComplete: raw.length === maxLen,
  };
};
