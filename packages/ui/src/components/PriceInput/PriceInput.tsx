import { forwardRef, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent, FocusEvent } from "react";
import { component, classNames } from "@frontend-kit/utils";

import { Input } from "../Input/Input";
import type { IInputProps } from "../Input/input.types";

type Currency = "₽" | "€" | "$" | "₸" | "₴" | "₾" | "£" | string;

export type PriceInputValue = string; // RAW digits

export type PriceInputProps = Omit<
  IInputProps,
  "value" | "onChange" | "fieldOverlay" | "inputMode"
> & {
  value: PriceInputValue;
  onValueChange: (rawDigits: PriceInputValue) => void;

  currency?: Currency;
  thousandSeparator?: string;

  allowEmpty?: boolean;
  maxDigits?: number;
  forbidZero?: boolean;

  /**
   * Резерв справа под иконки (clear/error/copy) — чтобы ₽ не заезжал под них.
   * Подгони под свой padding-right/иконки (у тебя padding-right 32px).
   */
  rightReservePx?: number;
};

const toDigits = (s: string) => (s.match(/\d/g) ?? []).join("");

const formatThousands = (digits: string, sep: string) => {
  const rev = digits.split("").reverse();
  const out: string[] = [];
  for (let i = 0; i < rev.length; i++) {
    if (i > 0 && i % 3 === 0) out.push(sep);
    out.push(rev[i]);
  }
  return out.reverse().join("");
};

const getInputLeftPaddingPx = (el: HTMLInputElement) => {
  const cs = getComputedStyle(el);
  const pl = parseFloat(cs.paddingLeft || "0");
  return Number.isFinite(pl) ? pl : 0;
};

const getInputRightPaddingPx = (el: HTMLInputElement) => {
  const cs = getComputedStyle(el);
  const pr = parseFloat(cs.paddingRight || "0");
  return Number.isFinite(pr) ? pr : 0;
};

export const PriceInput = forwardRef<HTMLInputElement, PriceInputProps>(
  (
    {
      value,
      onValueChange,

      currency = "₽",
      thousandSeparator = " ",
      allowEmpty = true,
      maxDigits = 15,
      forbidZero = false,
      rightReservePx = 32, // под вашу правую зону под иконки

      className,
      onClearField,
      disabled,
      readOnly,
      onBlur,
      onFocus,
      error,

      ...rest
    },
    ref
  ) => {
    const rawDigits = useMemo(() => {
      const d = toDigits(String(value ?? ""));
      return d.slice(0, maxDigits);
    }, [value, maxDigits]);

    const display = useMemo(() => {
      if (!rawDigits) return "";
      return formatThousands(rawDigits, thousandSeparator);
    }, [rawDigits, thousandSeparator]);

    const internalError =
      error ??
      (forbidZero && rawDigits !== "" && /^0+$/.test(rawDigits)
        ? "Значение не может быть 0"
        : undefined);

    // refs для измерения
    const inputElRef = useRef<HTMLInputElement | null>(null);
    const measureRef = useRef<HTMLSpanElement | null>(null);

    // положение ₽ (px относительно field-container)
    const [suffixX, setSuffixX] = useState<number>(0);

    // общий ref: наружу + внутрь
    const setRefs = (node: HTMLInputElement | null) => {
      inputElRef.current = node;

      if (typeof ref === "function") ref(node);
      else if (ref) (ref as any).current = node;
    };

    // что показываем пользователю как "текст" (для измерения и для плейсхолдера)
    const placeholderText = "0";
    const visibleText = display || placeholderText; // display = форматированное число "3 000"

    // в input.value кладём ТОЛЬКО введённое (иначе будет мешать required)
    const inputValue = display; // "" или "3 000"

    // показываем плейсхолдер в overlay только когда пусто
    const showGhost = display.length === 0;

    const [currencyLeft, setCurrencyLeft] = useState(0);

    const recalc = () => {
        const inputEl = inputElRef.current;
        const measureEl = measureRef.current;
        if (!inputEl || !measureEl) return;

        // 1) синхронизируем шрифт измерителя с input (иначе width неверный)
        const cs = getComputedStyle(inputEl);
        measureEl.style.font = cs.font;
        measureEl.style.letterSpacing = cs.letterSpacing;

        // 2) меряем именно visibleText (плейсхолдер "0" или введённое "3 000")
        measureEl.textContent = visibleText;

        const pl = parseFloat(cs.paddingLeft || "0") || 0;
        const pr = parseFloat(cs.paddingRight || "0") || 0;

        const textW = measureEl.getBoundingClientRect().width;
        const scrollLeft = inputEl.scrollLeft || 0;

        const GAP = 6; // расстояние между числом и ₽

        // ширина самого input (контента)
        const inputW = inputEl.getBoundingClientRect().width;

        // чтобы не залезало под иконки справа (у тебя padding-right 32px + сама кнопка)
        const maxLeft = Math.max(pl, inputW - pr - rightReservePx);

        const nextLeft = Math.min(Math.max(pl + textW + GAP - scrollLeft, pl), maxLeft);
        setCurrencyLeft(nextLeft);
    };

    useLayoutEffect(() => {
        recalc();
        }, [visibleText, currency, disabled, readOnly]);

        useLayoutEffect(() => {
        const el = inputElRef.current;
        if (!el) return;

        const ro = new ResizeObserver(recalc);
        ro.observe(el);

        const onScroll = () => recalc();
        el.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            ro.disconnect();
            el.removeEventListener("scroll", onScroll);
        };
    }, []);


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (disabled || readOnly) return;

      let digits = toDigits(e.target.value);

      if (!allowEmpty && digits.length === 0) digits = "0";
      if (digits.length > 1) digits = digits.replace(/^0+/, "") || "0";

      digits = digits.slice(0, maxDigits);
      onValueChange(digits);
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      if (!disabled && !readOnly && rawDigits.length > 1) {
        const normalized = rawDigits.replace(/^0+/, "") || "0";
        if (normalized !== rawDigits) onValueChange(normalized);
      }
      onBlur?.(e);
    };

    const handleClear = (e: any) => {
      onValueChange("");
      onClearField?.(e);
    };

    const overlay = (
        <span className={component("input", "price-overlay")()} aria-hidden="true">
            <span ref={measureRef} className={component("input", "price-measure")()} />

            {showGhost && (
            <span className={component("input", "price-ghost")()}>{placeholderText}</span>
            )}

            <span
            className={component("input", "price-currency")()}
            style={{ left: `${currencyLeft}px` }}
            >
            {currency}
            </span>
        </span>
    );

    return (
      <Input
        {...rest}
        className={classNames(component("input")(), className)}
        value={display}
        disabled={disabled}
        readOnly={readOnly}
        error={internalError}
        fieldOverlay={overlay}
        inputMode="numeric"
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={onFocus}
        onClearField={handleClear}
        ref={setRefs}
        placeholder={undefined}
      />
    );
  }
);
