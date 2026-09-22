import { CSSProperties, FC, MouseEvent, useId, useState } from "react";
import { classNames, component } from "@frontend-kit/utils";
import { useMedia } from "@frontend-kit/hooks";

import "./accordion.less";
import { IAccordionProps } from "./accordion.types";
import { Divider } from "../Divider";
import { IconChevronDown24Outline } from "../../assets/icons";

export const Accordion: FC<IAccordionProps> = ({
  card,
  children,
  className,
  style,
  open = false,
  onOpenChange,
  accordionBackground,
  onClick,
  divider = false,
  ...rest
}) => {
  const { isMobilePortraitMax } = useMedia();
  const contentId = useId();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(open);

  const isControlled = onOpenChange !== undefined;
  const expanded = isControlled ? !!open : uncontrolledOpen;

  const handleToggle = (event: MouseEvent<HTMLButtonElement>) => {
    const nextOpen = !expanded;

    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
    onClick?.(event);
  };

  const accordionClassName = classNames(
    component("accordion")({
      mobile: isMobilePortraitMax,
      expanded,
      divider,
    }),
    className,
  );
  const cardClassName = component("accordion", "card")();
  const iconClassName = component("accordion", "icon")();
  const contentClassName = component("accordion", "content")();
  const innerClassName = component("accordion", "inner")();
  const slotClassName = component("accordion", "slot")();
  const dividerContainerClassName = component(
    "accordion",
    "divider-container",
  )();

  const backgroundStyle = accordionBackground
    ? ({
        "--fk-accordion-background": accordionBackground,
      } as CSSProperties)
    : undefined;

  return (
    <div
      className={accordionClassName}
      style={{ ...backgroundStyle, ...style }}
      {...rest}
    >
      <button
        type="button"
        className={cardClassName}
        aria-expanded={expanded}
        aria-controls={contentId}
        onClick={handleToggle}
      >
        {card}
        <span className={iconClassName} aria-hidden="true">
          <IconChevronDown24Outline />
        </span>
      </button>
      <div
        id={contentId}
        className={contentClassName}
        role="region"
        aria-hidden={!expanded}
      >
        <div className={innerClassName}>
          {divider && (
            <div className={dividerContainerClassName}>
              <Divider variant="dashed" />
            </div>
          )}
          <div className={slotClassName}>{children}</div>
        </div>
      </div>
    </div>
  );
};
