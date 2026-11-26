import { FC, PropsWithChildren } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./pagination.less";
import {
  ellipsisIcon,
  IPaginationProps,
  IPaginationStepProps,
  PaginationDirection,
  stepConfig,
} from "./pagination.types";
import { getPaginationRange } from "./pagination.helpers";
import { PaginationContext, usePaginationContext } from "./pagination.context";
import { Button } from "../Button";
import { IconButton } from "../IconButton";

const itemClassName = component("pagination", "item")();

const PaginationRoot: FC<PropsWithChildren<IPaginationProps>> = ({
  page,
  pageCount,
  onPageChange,
  siblingCount = 1,
  disabled = false,
  size = "s",
  className,
  children,
  ...rest
}) => {
  const range = getPaginationRange(page, pageCount, siblingCount);

  const selectPage = (nextPage: number) => {
    if (
      disabled ||
      nextPage === page ||
      nextPage < 1 ||
      nextPage > range.pageCount
    ) {
      return;
    }

    onPageChange(nextPage);
  };

  const rootClassName = classNames(component("pagination")(), className);
  const listClassName = component(
    "pagination",
    "list",
  )({
    [`size-${size}`]: true,
  });

  return (
    <PaginationContext.Provider
      value={{
        page: range.page,
        pageCount: range.pageCount,
        disabled,
        items: range.items,
        selectPage,
        size,
      }}
    >
      <nav className={rootClassName} aria-label="Pagination" {...rest}>
        <ul className={listClassName}>
          {children ?? (
            <>
              <PaginationPrev />
              <PaginationPages />
              <PaginationNext />
            </>
          )}
        </ul>
      </nav>
    </PaginationContext.Provider>
  );
};

PaginationRoot.displayName = "Pagination";

const PaginationPages: FC = () => {
  const { items, page, disabled, selectPage, size } = usePaginationContext();
  const ellipsisClassName = component(
    "pagination",
    "ellipsis",
  )({
    [`size-${size}`]: true,
  });
  const EllipsisIcon = ellipsisIcon[size];

  return (
    <>
      {items.map((item, index) => (
        <li
          className={itemClassName}
          key={item === "ellipsis" ? `ellipsis-${index}` : item}
        >
          {item === "ellipsis" ? (
            <span className={ellipsisClassName} aria-hidden="true">
              <EllipsisIcon />
            </span>
          ) : (
            <Button
              size={size}
              variant={item === page ? "primary" : "transparent"}
              label={String(item)}
              disabled={disabled}
              aria-current={item === page ? "page" : undefined}
              onClick={() => selectPage(item)}
            />
          )}
        </li>
      ))}
    </>
  );
};

PaginationPages.displayName = "Pagination.Pages";

const PaginationStep: FC<
  IPaginationStepProps & { direction: PaginationDirection }
> = ({ direction, label, icon, ariaLabel }) => {
  const { page, pageCount, disabled, selectPage, size } =
    usePaginationContext();

  const step = stepConfig[direction];
  const FallbackIcon = step.icon[size];
  const targetPage = direction === "prev" ? page - 1 : page + 1;
  const isDisabled =
    disabled ||
    pageCount === 0 ||
    (direction === "prev" ? page <= 1 : page >= pageCount);

  if (!label) {
    return (
      <li className={itemClassName}>
        <IconButton
          size={size}
          variant="transparent"
          icon={icon && icon !== true ? icon : <FallbackIcon />}
          ariaLabel={ariaLabel ?? step.ariaLabel}
          disabled={isDisabled}
          onClick={() => selectPage(targetPage)}
        />
      </li>
    );
  }

  return (
    <li className={itemClassName}>
      <Button
        size={size}
        variant="transparent"
        label={label}
        icon={icon === true ? <FallbackIcon /> : icon}
        iconPosition={step.iconPosition}
        disabled={isDisabled}
        aria-label={ariaLabel}
        onClick={() => selectPage(targetPage)}
      />
    </li>
  );
};

const PaginationPrev: FC<IPaginationStepProps> = (props) => (
  <PaginationStep direction="prev" {...props} />
);

const PaginationNext: FC<IPaginationStepProps> = (props) => (
  <PaginationStep direction="next" {...props} />
);

PaginationPrev.displayName = "Pagination.Prev";
PaginationNext.displayName = "Pagination.Next";

export const Pagination = Object.assign(PaginationRoot, {
  Prev: PaginationPrev,
  Next: PaginationNext,
  Pages: PaginationPages,
});
