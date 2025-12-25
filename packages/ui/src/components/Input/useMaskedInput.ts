import { useLayoutEffect, useMemo, useRef } from "react";

type SlotType = "digit" | "letter" | "any";
type Token =
  | { type: "slot"; slot: SlotType; placeholder: string }
  | { type: "lit"; char: string };

type VisualToken = {
  char: string;
  filled: boolean;
};

type PlaceholderConfig =
  | string
  | Partial<Record<SlotType, string>>
  | ((ctx: { slot: SlotType; maskPos: number; tokenIndex: number }) => string);


const buildVisualTokens = (tokens: Token[], raw: string): VisualToken[] => {
  let rawIdx = 0;

  return tokens.map((t) => {
    if (t.type === "lit") {
      return { char: t.char, filled: true };
    }

    const char = raw[rawIdx];
    if (char) {
      rawIdx += 1;
      return { char, filled: true };
    }

    return { char: t.placeholder, filled: false };
  });
};

const resolvePlaceholder = (
  placeholders: PlaceholderConfig | undefined,
  slot: SlotType,
  maskPos: number,
  tokenIndex: number
) => {
  if (!placeholders) return "_";

  if (typeof placeholders === "string") return placeholders;

  if (typeof placeholders === "function") {
    return placeholders({ slot, maskPos, tokenIndex });
  }

  // объект по типу слота
  return placeholders[slot] ?? "_";
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

const apply = (raw: string, tokens: Token[]) => {
  let ri = 0;
  let res = "";

  for (const t of tokens) {
    if (t.type === "lit") {
      res += t.char;
    } else {
      const c = raw[ri];
      if (c && match(t.slot, c)) {
        res += c;
        ri += 1;
      } else {
        res += t.placeholder;
      }
    }
  }

  return res;
};

const extractRaw = (masked: string, tokens: Token[]) => {
  let res = "";
  let mi = 0;

  for (const t of tokens) {
    const ch = masked[mi];
    if (!ch) break;

    if (t.type === "lit") {
      mi += 1;
    } else {
      if (match(t.slot, ch)) res += ch;
      mi += 1;
    }
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

const nextSlotPosAfter = (fromPos: number, tokens: Token[]) => nextSlotPos(fromPos + 1, tokens);

const prevSlotPos = (fromPos: number, tokens: Token[]) => {
  for (let p = Math.min(fromPos, tokens.length - 1); p >= 0; p--) {
    if (tokens[p]?.type === "slot") return p;
  }
  return -1;
};

const slotTypeAtPos = (maskPos: number, tokens: Token[]) => {
  const t = tokens[maskPos];
  return t && t.type === "slot" ? t.slot : null;
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
    } else {
      pos += 1;
    }
  }

  return pos;
};

export const useMaskedInput = (params: {
  mask?: string;
  value: string;
  onValueChange: (v: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
  returnMasked?: boolean;
  placeholders?: PlaceholderConfig;
}) => {
  const { mask, value, onValueChange, disabled, readOnly, returnMasked, placeholders } = params;

  const hasMask = !!mask;

  const tokens = useMemo(
      () => (hasMask ? parseMask(mask!, placeholders) : []),
      [hasMask, mask, placeholders]
  );
  const maxLen = useMemo(() => (hasMask ? maxRawLen(tokens) : 0), [hasMask, tokens]);

  const raw = useMemo(() => {
    if (!hasMask) return value ?? "";
    const r = returnMasked ? extractRaw(value ?? "", tokens) : (value ?? "");
    return r.slice(0, maxLen);
  }, [hasMask, value, returnMasked, tokens, maxLen]);

  const maskedValue = useMemo(() => {
    if (!hasMask) return value ?? "";
    return apply(raw, tokens);
  }, [hasMask, value, raw, tokens]);

  const visualTokens = useMemo(
    () => (hasMask ? buildVisualTokens(tokens, raw) : null),
    [hasMask, tokens, raw]
  );

  const isComplete = hasMask ? raw.length === maxLen : true;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const pendingCaretRawLen = useRef<number | null>(null);
  const rawRef = useRef(raw);
  rawRef.current = raw;

  useLayoutEffect(() => {
    if (!hasMask) return;

    if (
      pendingCaretRawLen.current != null &&
      inputRef.current &&
      document.activeElement === inputRef.current
    ) {
      const pos = caretFromRawLen(pendingCaretRawLen.current, tokens);
      inputRef.current.setSelectionRange(pos, pos);
      pendingCaretRawLen.current = null;
    }
  }, [hasMask, maskedValue, tokens]);

  const emit = (nextRaw: string, caretRawLen?: number) => {
    if (!hasMask) {
      onValueChange(nextRaw);
      return;
    }

    const limited = nextRaw.slice(0, maxLen);
    pendingCaretRawLen.current = caretRawLen ?? limited.length;
    onValueChange(returnMasked ? apply(limited, tokens) : limited);
  };

  const onChangeMasked: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (disabled || readOnly) return;

    if (!hasMask) {
      onValueChange(e.target.value);
      return;
    }

    const nextRaw = extractRaw(e.target.value, tokens);
    emit(nextRaw);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (disabled || readOnly) return;
    if (!hasMask) return;

    const el = e.currentTarget;
    const s = el.selectionStart;
    const t = el.selectionEnd;
    if (s == null || t == null) return;

    const curRaw = rawRef.current;

    const deleteRange = (startMaskPos: number, endMaskPos: number) => {
      const a = rawIndexFromMaskPos(startMaskPos, tokens);
      const b = rawIndexFromMaskPos(endMaskPos, tokens);
      const next = curRaw.slice(0, a) + curRaw.slice(b);
      e.preventDefault();
      emit(next, a);
    };

    // printable char input -> overwrite in slot
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      let caretPos = s;

      if (!isSlotPos(caretPos, tokens)) {
        caretPos = nextSlotPos(caretPos, tokens);
      }
      if (caretPos >= tokens.length) return;

      const slotType = slotTypeAtPos(caretPos, tokens);
      if (!slotType) return;

      if (!match(slotType, e.key)) {
        e.preventDefault();
        return;
      }

      const start = s;
      const end = t;

      let workingRaw = curRaw;
      let targetMaskPos = caretPos;

      if (start !== end) {
        const a = rawIndexFromMaskPos(start, tokens);
        const b = rawIndexFromMaskPos(end, tokens);
        workingRaw = curRaw.slice(0, a) + curRaw.slice(b);
        targetMaskPos = nextSlotPos(start, tokens);
      }

      const computedTargetRawIdx = rawIndexFromMaskPos(targetMaskPos, tokens);
      const targetRawIdx = Math.min(computedTargetRawIdx, workingRaw.length);

      let nextRaw = workingRaw;

      if (targetRawIdx < nextRaw.length) {
        nextRaw = nextRaw.slice(0, targetRawIdx) + e.key + nextRaw.slice(targetRawIdx + 1);
      } else {
        nextRaw = nextRaw + e.key;
      }

      const nextMaskPos = nextSlotPosAfter(targetMaskPos, tokens);
      const nextRawCaret = rawIndexFromMaskPos(nextMaskPos, tokens);

      e.preventDefault();
      emit(nextRaw, nextRawCaret);
      return;
    }

    if (e.key === "Backspace") {
      if (s !== t) return deleteRange(s, t);
      if (s === 0) return;

      let pos = s - 1;
      if (!isSlotPos(pos, tokens)) {
        pos = prevSlotPos(pos, tokens);
      }
      if (pos < 0) return;

      const rawIdx = rawIndexFromMaskPos(pos + 1, tokens) - 1;
      if (rawIdx < 0 || rawIdx >= curRaw.length) return;

      const next = curRaw.slice(0, rawIdx) + curRaw.slice(rawIdx + 1);
      e.preventDefault();
      emit(next, rawIdx);
    }

    if (e.key === "Delete") {
      if (s !== t) return deleteRange(s, t);

      let pos = s;
      if (!isSlotPos(pos, tokens)) {
        pos = nextSlotPos(pos, tokens);
      }
      if (pos >= tokens.length) return;

      const rawIdx = rawIndexFromMaskPos(pos, tokens);
      if (rawIdx < 0 || rawIdx >= curRaw.length) return;

      const next = curRaw.slice(0, rawIdx) + curRaw.slice(rawIdx + 1);
      e.preventDefault();
      emit(next, rawIdx);
    }
  };

  const clear = () => {
    if (disabled || readOnly) return;
    emit("", 0);
  };

  return {
    inputRef,
    hasMask,
    maskedValue,
    rawValue: raw,
    isComplete,
    onChangeMasked,
    onKeyDown,
    clear,
    visualTokens,
  };
};
