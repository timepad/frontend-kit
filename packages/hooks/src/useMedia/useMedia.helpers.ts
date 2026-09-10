import { CustomMedia, MediaObject } from "./useMedia.types";

type MediaQueryEntry = {
  key: string;
  mediaQueryList?: MediaQueryList;
};

const normalizeQuery = (
  query: number | string | undefined,
): string | undefined => {
  if (typeof query === "number") {
    return `(max-width: ${query}px)`;
  }

  return query;
};

export const createMediaQueryEntries = (
  queries: Record<string, string | number | undefined>,
): MediaQueryEntry[] => {
  return Object.entries(queries).map(([key, query]) => {
    const normalizedQuery = normalizeQuery(query);

    return {
      key,
      mediaQueryList: normalizedQuery
        ? window.matchMedia(normalizedQuery)
        : undefined,
    };
  });
};

export const createSnapshot = <T extends CustomMedia>(
  mediaQueryEntries: MediaQueryEntry[],
): MediaObject<T> => {
  return Object.fromEntries(
    mediaQueryEntries.map(({ key, mediaQueryList }) => [
      key,
      mediaQueryList?.matches,
    ]),
  ) as MediaObject<T>;
};

export const areSnapshotsEqual = (
  prevSnapshot: Record<string, boolean | undefined>,
  nextSnapshot: Record<string, boolean | undefined>,
): boolean => {
  const prevKeys = Object.keys(prevSnapshot);
  const nextKeys = Object.keys(nextSnapshot);

  return (
    prevKeys.length === nextKeys.length &&
    nextKeys.every((key) => prevSnapshot[key] === nextSnapshot[key])
  );
};
