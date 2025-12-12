import { InputHTMLAttributes, MouseEventHandler, ReactNode, SyntheticEvent } from "react";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  onClearField?: (event: SyntheticEvent<HTMLButtonElement>) => void;
  error?: ReactNode;
  description?: ReactNode;
}
