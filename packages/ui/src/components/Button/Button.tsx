import React from "react";
import "./button.less";

export interface ButtonProps {
  /**
   * Button label
   */
  label: string;
  /**
   * Click handler
   */
  onClick?: () => void;
  /**
   * Button variant
   */
  variant?: "primary" | "secondary";
  /**
   * Disabled state
   */
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "primary",
  disabled = false,
}) => {
  const className = `button button--variant-${variant} ${
    disabled ? "button--disabled" : ""
  }`;
  return (
    <button onClick={onClick} disabled={disabled} className={className}>
      {label}
    </button>
  );
};
