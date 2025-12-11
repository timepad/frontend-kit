import { ReactNode, TextareaHTMLAttributes } from "react";

type TextareaSize = "s" | "m";

export interface ITextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  label: ReactNode;
  resize?: boolean;
  size?: TextareaSize;
  description?: ReactNode;
  error?: ReactNode;
  maxSymbols?: number;
}
