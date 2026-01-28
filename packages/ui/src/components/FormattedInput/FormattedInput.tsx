import { forwardRef, useLayoutEffect, useRef } from "react";
import { component, classNames } from "@frontend-kit/utils";

import { Input } from "../Input/Input";
import type { IInputProps } from "../Input/input.types";
import { useFormattedInput } from "./useFormattedInput";
import type { ValueFormatter, ValueParser } from "./formattedInput.utils";

type Slot = Parameters<typeof useFormattedInput>[0]["suffixSlot"];

export type FormattedInputProps = Omit<
  IInputProps,
  "value" | "onChange" | "placeholder" | "fieldOverlay" | "inputMode" | "onBeforeInput"
> & {
  value: string;
  onValueChange: (raw: string) => void;

  format?: ValueFormatter;
  parse?: ValueParser;

  emptyVisual?: string;
  showEmptyVisual?: boolean;

  /** Ограничение raw */
  maxLen?: number;

  normalizeOnBlur?: (raw: string) => string;

  /** Слот (универсально для ₽, %, kg и т.п.) */
  suffixSlot?: Slot;

  /** Mobile/IME */
  imeSafe?: boolean;

  /** inputMode можно задавать (numeric для цены) */
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
};

export const FormattedInput = forwardRef<HTMLInputElement, FormattedInputProps>(
  (
    {
      value,
      onValueChange,

      format,
      parse,

      emptyVisual = "",
      showEmptyVisual = true,
      maxLen,
      normalizeOnBlur,

      suffixSlot,

      imeSafe = true,
      inputMode = "text",

      disabled,
      readOnly,

      onBlur: onBlurOuter,
      onClearField,
      className,

      ...rest
    },
    ref
  ) => {
    const {
      display,
      ghostText,
      suffix,
      handlers: { onChange, onBlur },
    } = useFormattedInput({
      value,
      onValueChange,
      format,
      parse,
      emptyVisual,
      showEmptyVisual,
      maxLen,
      normalizeOnBlur,
      suffixSlot,
      disabled,
      readOnly,
    });

    const inputElRef = useRef<HTMLInputElement | null>(null);
    const overlayRef = useRef<HTMLSpanElement | null>(null);

    useLayoutEffect(() => {
      const inputEl = inputElRef.current;
      const overlayEl = overlayRef.current;
      if (!inputEl || !overlayEl) return;

      const sync = () => {
        overlayEl.style.setProperty("--fi-scroll-left", `${inputEl.scrollLeft}px`);
      };

      sync();
      inputEl.addEventListener("scroll", sync, { passive: true });

      // на всякий случай при ресайзе/смене шрифта
      const ro = new ResizeObserver(sync);
      ro.observe(inputEl);

      return () => {
        inputEl.removeEventListener("scroll", sync);
        ro.disconnect();
      };
    }, []);

    const filled = !ghostText;

    const overlay = (
      <span
        ref={overlayRef}
        className={component("input", "formatted-overlay")()}
        aria-hidden="true"
      >
        <span className={component("input", "formatted-viewport")()}>
          <span className={component("input", "formatted-track")()}>
            <span
              className={classNames(
                component("input", "formatted-content")(),
                ghostText && component("input", "formatted-content")({ empty: true })
              )}
            >
              {ghostText ?? display}
            </span>

            {suffix && (
              <span className={classNames(
                component("input", "formatted-suffix")(),
                filled && component("input", "formatted-suffix")({ filled: true })
              )}>
                {suffix}
              </span>
            )}
          </span>
        </span>
      </span>
    );

    return (
      <Input
        {...rest}
        ref={(node) => {
          // наружный ref
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as any).current = node;

          // внутренний ref
          inputElRef.current = node;
        }}
        className={className}
        value={display} // важно: если raw пустой — display должен быть ""
        disabled={disabled}
        readOnly={readOnly}
        fieldOverlay={overlay}
        placeholder={undefined}
        inputMode={inputMode}
        onChange={onChange}
        onBlur={(e) => {
          onBlur(e);
          onBlurOuter?.(e);
        }}
        onClearField={(e) => {
          onValueChange("");
          onClearField?.(e);
        }}
        data-formatted="true"
      />
    );
  }
);
