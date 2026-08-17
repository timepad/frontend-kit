/**
 * Причина закрытия слоя.
 *
 * - **escape** — клавиша Escape.
 * - **backdrop** — клик по backdrop (Modal).
 * - **outside-press** — клик вне слоя (Dropdown / Popover).
 * - **drag** — drag-to-close (Modal bottom sheet).
 * - **action** — явное действие пользователя (кнопка закрытия и т.п.).
 */
export type LayerDismissReason =
  | "escape"
  | "backdrop"
  | "outside-press"
  | "drag"
  | "action";

export type LayerOpenChangeDetails = {
  reason?: LayerDismissReason;
};

export type LayerOpenChangeHandler = (
  open: boolean,
  details?: LayerOpenChangeDetails,
) => void;

export type LayerDismissHandler = (reason: LayerDismissReason) => void;

export interface IUseLayerOptions {
  open: boolean;
  onOpenChange?: LayerOpenChangeHandler;
  /** Стабильный id слоя; если не передан — генерируется внутри хука. */
  id?: string;
}

export interface IUseLayerResult {
  layerId: string;
  /** `true`, если слой верхний в стеке открытых слоёв. */
  isTop: boolean;
  /** Закрыть слой с указанием причины. */
  dismiss: LayerDismissHandler;
}
