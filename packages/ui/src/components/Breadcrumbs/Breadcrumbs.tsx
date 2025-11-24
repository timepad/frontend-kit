import { FC } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./breadcrumbs.less";
import { IBreadcrumbItem, IBreadcrumbsProps } from "./breadcrumbs.types";
import { Typography } from "../Typography";
import { IconLineArrowLeft16Outline } from "../../assets/icons";

export const Breadcrumbs: FC<IBreadcrumbsProps> = ({
  items,
  separator,
  className,
  type = "default",
  ...rest
}) => {
  const breadcrumbsClassName = classNames(
    component("breadcrumbs")(),
    className
  );

  return (
    <div className={breadcrumbsClassName} {...rest}>
      {type === "backstep" ? (
        <div className={component("breadcrumbs", "item")()}>
          <span className={component("breadcrumbs", "separator")()}>
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
              <div className={component("breadcrumbs", "item")()} key={index}>
                <BreadcrumbNode item={item} isCurrent={isCurrent} />

                {!isLast && separator && (
                  <span className={component("breadcrumbs", "separator")()}>
                    {separator}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
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
    >
      <Typography.Caption
        tag="C1 REGULAR"
        as="span"
        className={component("breadcrumbs", "link-text")()}
      >
        {label}
      </Typography.Caption>
    </a>
  );
};
