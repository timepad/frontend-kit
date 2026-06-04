const Styles = {
  "rsp-mobile-max": 1024 - 0.4,
  "rsp-mobile-portrait-max": 736 - 0.4,
} as const;

export const Media = {
  isMobilePortraitMax: `(max-width: ${Styles["rsp-mobile-portrait-max"]}px)`,
  isMobileMax: `(max-width: ${Styles["rsp-mobile-max"]}px)`,
  isTabletMax: `((min-width: ${Styles["rsp-mobile-portrait-max"]}px) and (max-width: ${Styles["rsp-mobile-max"]}px))`,
} as const;

export type CustomMedia = Record<string, number | string | undefined>;

export type MediaObject<T extends CustomMedia> = Record<
  keyof typeof Media,
  boolean
> &
  Record<keyof T, boolean | undefined>;
