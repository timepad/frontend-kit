import { useCallback, useMemo, useRef, useSyncExternalStore } from "react";

import { CustomMedia, Media, MediaObject } from "./useMedia.types";
import {
  areSnapshotsEqual,
  createMediaQueryEntries,
  createSnapshot,
} from "./useMedia.helpers";

export const useMedia = <T extends CustomMedia = {}>(
  additionalMedia?: T,
): MediaObject<T> => {
  const queries = useMemo(
    () => ({
      ...additionalMedia,
      ...Media,
    }),
    [additionalMedia],
  );

  const mediaQueryEntries = useMemo(
    () => createMediaQueryEntries(queries),
    [queries],
  );

  const snapshotRef = useRef<MediaObject<T> | null>(null);

  const subscribe = useCallback(
    (onChange: () => void) => {
      mediaQueryEntries.forEach(({ mediaQueryList }) => {
        mediaQueryList?.addEventListener("change", onChange);
      });

      return () => {
        mediaQueryEntries.forEach(({ mediaQueryList }) => {
          mediaQueryList?.removeEventListener("change", onChange);
        });
      };
    },
    [mediaQueryEntries],
  );

  const getSnapshot = useCallback(() => {
    const nextSnapshot = createSnapshot<T>(mediaQueryEntries);
    const prevSnapshot = snapshotRef.current;

    if (prevSnapshot && areSnapshotsEqual(prevSnapshot, nextSnapshot)) {
      return prevSnapshot;
    }

    snapshotRef.current = nextSnapshot;

    return nextSnapshot;
  }, [mediaQueryEntries]);

  return useSyncExternalStore(subscribe, getSnapshot);
};
