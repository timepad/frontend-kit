import { FC } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./breadcrumbs.less";
import { IBreadcrumbItem, IBreadcrumbsProps } from "./breadcrumbs.types";
import { Typography } from "../Typography";
import {
  IconLineArrowLeft16Outline,
  IconLineArrowRight16Outline,
} from "../../assets/icons";

export const Breadcrumbs: FC<IBreadcrumbsProps> = ({
  items,
  className,
  type = "default",
  ...rest
}) => {
  const breadcrumbsClassName = classNames(
    component("breadcrumbs")(),
    className
  );

  const itemClassName = component("breadcrumbs", "item")();

  const separatorClassName = component("breadcrumbs", "separator")();

  return (
    <nav className={breadcrumbsClassName} aria-label="Breadcrumbs" {...rest}>
      {type === "backstep" ? (
        <div className={itemClassName}>
          <span className={separatorClassName} aria-hidden="true">
            <IconLineArrowLeft16Outline />
          </span>
          <BreadcrumbNode item={items[0]} isCurrent={!!items[0].isCurrent} />
        </div>
      ) : (
        <div className={component("breadcrumbs", "list")()}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isCurrent = item.isCurrent ?? isLast;

            return (
              <div className={itemClassName} key={index}>
                <BreadcrumbNode item={item} isCurrent={isCurrent} />

                {!isLast && (
                  <span className={separatorClassName} aria-hidden="true">
                    <IconLineArrowRight16Outline />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </nav>
  );
};

interface IBreadcrumbNodeProps {
  item: IBreadcrumbItem;
  isCurrent: boolean;
}

const BreadcrumbNode: FC<IBreadcrumbNodeProps> = ({ item, isCurrent }) => {
  const { label, href, onClick } = item;

  return (
    <a
      className={component("breadcrumbs", "link")({ current: isCurrent })}
      href={href}
      onClick={onClick}
      aria-current={isCurrent ? "page" : "false"}
    >
      <Typography.Caption
        tag="C1 REGULAR"
        className={component("breadcrumbs", "link-text")()}
      >
        {label}
      </Typography.Caption>
    </a>
  );
};
