import { CSSProperties, FC, MouseEvent, useId, useState } from "react";
import { classNames, component } from "@frontend-kit/utils";
import { useMedia } from "@frontend-kit/hooks";

import "./accordion.less";
import { IAccordionProps } from "./accordion.types";
import { IconChevronDown24Outline } from "../../assets/icons";

export const Accordion: FC<IAccordionProps> = ({
  card,
  children,
  className,
  style,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  accordionBackground,
  onClick,
  ...rest
}) => {
  const { isMobilePortraitMax } = useMedia();
  const contentId = useId();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  const isControlled = openProp !== undefined;
  const expanded = isControlled ? !!openProp : uncontrolledOpen;

  const handleToggle = (event: MouseEvent<HTMLDivElement>) => {
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
    }),
    className,
  );
  const cardClassName = classNames(component("accordion", "card")());
  const iconClassName = component("accordion", "icon")();
  const contentClassName = component("accordion", "content")();
  const innerClassName = component("accordion", "inner")();
  const slotClassName = component("accordion", "slot")();

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
      <div
        role="button"
        tabIndex={0}
        className={cardClassName}
        aria-expanded={expanded}
        aria-controls={contentId}
        onClick={handleToggle}
      >
        {card}
        <span className={iconClassName}>
          <IconChevronDown24Outline />
        </span>
      </div>
      <div
        id={contentId}
        className={contentClassName}
        role="region"
        aria-hidden={!expanded}
      >
        <div className={innerClassName}>
          <div className={slotClassName}>{children}</div>
        </div>
      </div>
    </div>
  );
};
