import { forwardRef } from "react";
import { classNames, component } from "@frontend-kit/utils";
import { IconLock16Fill, IconLock24Fill } from "../../assets/icons";

import "./switch.less";
import { ISwitchProps, SwitchSize } from "./switch.types";

export const Switch = forwardRef<HTMLInputElement, ISwitchProps>(
  ({ className, size = "m", disabled, checked, ...rest }, ref) => {
    const LockIcon = lockIcon[size];

    const switchClassName = classNames(component("switch")({ [`size-${size}`]: true }), className);
    const fieldClassName = component("switch", "field")();
    const knobClassName = component("switch", "knob")();
    const lockClassName = component("switch", "lock")();

    return (
      <label className={switchClassName}>
        <input
          className={fieldClassName}
          type="checkbox"
          role="switch"
          ref={ref}
          disabled={disabled}
          checked={checked}
          aria-checked={checked}
          {...rest}
        />
        <span className={knobClassName} aria-hidden="true">
          {disabled && (
            <span className={lockClassName}>
              <LockIcon />
            </span>
          )}
        </span>
      </label>
    );
  },
);

const lockIcon: Record<SwitchSize, typeof IconLock16Fill> = {
  m: IconLock16Fill,
  l: IconLock24Fill,
};
