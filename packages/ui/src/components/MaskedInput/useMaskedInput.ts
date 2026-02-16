import { useLayoutEffect, useMemo, useRef } from "react";
import type {
  EditMode,
  UseMaskedInputParams,
} from "./useMaskedInput.types";
import {
  applyForInputValue,
  buildVisualTokens,
  caretFromRawLen,
  defaultSmartPasteDetector,
  digitsOnly,
  extractRawFromInputValue,
  insertIntoRaw,
  isRuPhoneMask,
  isSlotPos,
  match,
  maxRawLen,
  nextSlotPos,
  normalizeRuPhoneDigitsForSlots,
  overwriteIntoRaw,
  parseMask,
  prevSlotPos,
  rawIndexFromMaskPos,
} from "./useMaskedInput.helpers";

/**
 * Хук управления masked-input с поддержкой двух режимов редактирования и smart-вставки.
 *
 * @param params - Параметры настройки маски, режимов ввода и обратного вызова изменения.
 * @returns Набор значений и обработчиков для подключения к инпуту и overlay.
 */
export const useMaskedInput = (params: UseMaskedInputParams) => {
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
