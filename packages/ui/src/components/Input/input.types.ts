import { InputHTMLAttributes, MouseEvent, ReactNode } from "react";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  label: ReactNode;
  onClearField?: (event: MouseEvent<HTMLButtonElement>) => void;
  error?: ReactNode;
  description?: ReactNode;

  /** Слот для оверлея */
  fieldOverlay?: ReactNode;
}
