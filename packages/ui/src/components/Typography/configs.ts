import {
  FontType,
  ICaptionVariant,
  IHeaderVariant,
  ILeadVariant,
  IParagraphVariant,
  Size,
} from "./typography.types";

/* ──────────────────────────────────────────────────────────
 * LEAD TAGS & CONFIG
 * ──────────────────────────────────────────────────────── */
export type LeadVariantTag =
  | "L1 UPP BOLD"
  | "L1 BOLD"
  | "L2 UPP BOLD"
  | "L2 BOLD"
  | "L3 UPP BOLD"
  | "L3 BOLD";

type LeadVariantConfig = {
  size: ILeadVariant["size"];
  uppercase?: boolean;
};

export const LEAD_VARIANT_CONFIG: Record<LeadVariantTag, LeadVariantConfig> = {
  "L1 UPP BOLD": { size: 1, uppercase: true },
  "L1 BOLD": { size: 1 },

  "L2 UPP BOLD": { size: 2, uppercase: true },
  "L2 BOLD": { size: 2 },

  "L3 UPP BOLD": { size: 3, uppercase: true },
  "L3 BOLD": { size: 3 },
};

/* ──────────────────────────────────────────────────────────
 * HEADER TAGS & CONFIG
 * ──────────────────────────────────────────────────────── */
export type HeaderVariantTag =
  | "H1 ACCENT BOLD"
  | "H1 BOLD"
  | "H2 ACCENT BOLD"
  | "H2 BOLD"
  | "H3 ACCENT BOLD"
  | "H3 BOLD"
  | "H3 MEDIUM"
  | "H4 ACCENT BOLD"
  | "H4 BOLD"
  | "H4 MEDIUM";

type HeaderVariantConfig = {
  size: Size;
  fontType: FontType;
  fontWeight: IHeaderVariant["fontWeight"];
};

export const HEADER_VARIANT_CONFIG: Record<
  HeaderVariantTag,
  HeaderVariantConfig
> = {
  "H1 ACCENT BOLD": { size: 1, fontType: "accent", fontWeight: "bold" },
  "H1 BOLD": { size: 1, fontType: "regular", fontWeight: "bold" },

  "H2 ACCENT BOLD": { size: 2, fontType: "accent", fontWeight: "bold" },
  "H2 BOLD": { size: 2, fontType: "regular", fontWeight: "bold" },

  "H3 ACCENT BOLD": { size: 3, fontType: "accent", fontWeight: "bold" },
  "H3 BOLD": { size: 3, fontType: "regular", fontWeight: "bold" },
  "H3 MEDIUM": { size: 3, fontType: "regular", fontWeight: "medium" },

  "H4 ACCENT BOLD": { size: 4, fontType: "accent", fontWeight: "bold" },
  "H4 BOLD": { size: 4, fontType: "regular", fontWeight: "bold" },
  "H4 MEDIUM": { size: 4, fontType: "regular", fontWeight: "medium" },
};

/* ──────────────────────────────────────────────────────────
 * PARAGRAPH TAGS & CONFIG
 * ──────────────────────────────────────────────────────── */
export type ParagraphVariantTag =
  | "P1 REGULAR"
  | "P2 REGULAR"
  | "P3 BOLD"
  | "P3 SEMIBOLD"
  | "P3 REGULAR"
  | "P4 UPP BOLD"
  | "P4 BOLD"
  | "P4 SEMIBOLD"
  | "P4 REGULAR";

type ParagraphVariantConfig = {
  size: Size;
  fontWeight: IParagraphVariant["fontWeight"];
  uppercase?: boolean;
};

export const PARAGRAPH_VARIANT_CONFIG: Record<
  ParagraphVariantTag,
  ParagraphVariantConfig
> = {
  "P1 REGULAR": { size: 1, fontWeight: "regular" },

  "P2 REGULAR": { size: 2, fontWeight: "regular" },

  "P3 BOLD": { size: 3, fontWeight: "bold" },
  "P3 SEMIBOLD": { size: 3, fontWeight: "semi-bold" },
  "P3 REGULAR": { size: 3, fontWeight: "regular" },

  "P4 UPP BOLD": { size: 4, fontWeight: "bold", uppercase: true },
  "P4 BOLD": { size: 4, fontWeight: "bold" },
  "P4 SEMIBOLD": { size: 4, fontWeight: "semi-bold" },
  "P4 REGULAR": { size: 4, fontWeight: "regular" },
};

/* ──────────────────────────────────────────────────────────
 * CAPTION TAGS & CONFIG
 * ──────────────────────────────────────────────────────── */
export type CaptionVariantTag =
  | "C1 UPP BOLD"
  | "C1 BOLD"
  | "C1 UPP SEMIBOLD"
  | "C1 SEMIBOLD"
  | "C1 REGULAR";

type CaptionVariantConfig = {
  size: ICaptionVariant["size"];
  fontWeight: ICaptionVariant["fontWeight"];
  uppercase?: boolean;
};

export const CAPTION_VARIANT_CONFIG: Record<
  CaptionVariantTag,
  CaptionVariantConfig
> = {
  "C1 UPP BOLD": { size: 1, fontWeight: "bold", uppercase: true },
  "C1 BOLD": { size: 1, fontWeight: "bold" },
  "C1 UPP SEMIBOLD": { size: 1, fontWeight: "semi-bold", uppercase: true },
  "C1 SEMIBOLD": { size: 1, fontWeight: "semi-bold" },
  "C1 REGULAR": { size: 1, fontWeight: "regular" },
};
