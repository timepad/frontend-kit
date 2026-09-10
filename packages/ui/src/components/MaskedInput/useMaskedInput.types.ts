/** Тип слота маски: цифра, латинская буква или любой непустой символ. */
export type SlotType = "digit" | "letter" | "any";

/** Токен маски: либо редактируемый слот, либо литеральный символ. */
export type Token =
  | { type: "slot"; slot: SlotType; placeholder: string }
  | { type: "lit"; char: string };

/** Символ для визуального слоя и флаг, заполнен ли он пользовательским вводом. */
export type VisualToken = { char: string; filled: boolean };

/** Контекст генерации placeholder для конкретного слота маски. */
export type PlaceholderResolverContext = {
  slot: SlotType;
  maskPos: number;
  tokenIndex: number;
};

/**
 * Конфигурация placeholder:
 * - одна строка для всех слотов;
 * - объект со значениями по типу слота;
 * - функция-резолвер на основе контекста.
 */
export type PlaceholderConfig =
  | string
  | Partial<Record<SlotType, string>>
  | ((ctx: PlaceholderResolverContext) => string);

/** Режим ввода с клавиатуры. */
export type EditMode = "shift" | "overwrite";

/** Режим вставки буфера обмена. */
export type PasteMode = "shift" | "overwrite" | "smart";

/** Контекст для определения режима smart-вставки. */
export type SmartPasteCtx = {
  mask: string;
  tokens: Token[];
  maxLen: number;
  digitsOnly: string;
  raw: string;
};

/** Детектор режима smart-вставки. */
export type SmartPasteDetector = (ctx: SmartPasteCtx) => "shift" | "overwrite";

/** Параметры хука useMaskedInput. */
export type UseMaskedInputParams = {
  /** Строка маски (`9` — цифра, `A` — буква, `*` — любой символ, `\\` — экранирование). */
  mask: string;
  /** Значение в RAW-формате по умолчанию. */
  value: string;
  /** Колбэк изменения значения (возвращает RAW или masked в зависимости от returnMasked). */
  onValueChange: (v: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
  /** Кастомные placeholder для overlay-слоя. */
  placeholders?: PlaceholderConfig;
  /** Возвращать наружу masked-значение вместо RAW (редкий сценарий). */
  returnMasked?: boolean;
  /** Режим ввода символов с клавиатуры. По умолчанию `"shift"`. */
  inputMode?: EditMode;
  /** Режим вставки. По умолчанию `"smart"`. */
  pasteMode?: PasteMode;
  /** Пользовательский детектор режима вставки для `pasteMode = "smart"`. */
  smartPasteDetector?: SmartPasteDetector;
};
