export type PaginationItem = number | "ellipsis";

const toCount = (value: number): number => {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.floor(value));
};

export const getPaginationRange = (
  page: number,
  pageCount: number,
  siblingCount: number,
): { page: number; pageCount: number; items: PaginationItem[] } => {
  const safePageCount = toCount(pageCount);
  const safeSiblingCount = toCount(siblingCount);

  if (safePageCount === 0) {
    return { page: 1, pageCount: 0, items: [] };
  }

  const safePage = Math.min(Math.max(toCount(page), 1), safePageCount);
  const visible = new Set<number>([1, safePage, safePageCount]);

  for (let offset = 1; offset <= safeSiblingCount; offset += 1) {
    const previous = safePage - offset;
    const next = safePage + offset;

    if (previous >= 1) visible.add(previous);
    if (next <= safePageCount) visible.add(next);
  }

  const sorted = [...visible].sort((left, right) => left - right);
  const items: PaginationItem[] = [];

  sorted.forEach((value, index) => {
    const previous = sorted[index - 1];

    if (previous !== undefined) {
      const gap = value - previous;

      if (gap === 2) {
        items.push(previous + 1);
      } else if (gap > 2) {
        items.push("ellipsis");
      }
    }

    items.push(value);
  });

  return { page: safePage, pageCount: safePageCount, items };
};
