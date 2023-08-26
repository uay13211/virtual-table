import React from "react";
import classNames from "classNames";
import type { VirtualTableColumn, ColumnsStickyPosition } from "./type";
import { memo } from "utils/TypedMemo";

interface Props<RowType extends object> {
  headerRef:
    | React.RefObject<HTMLDivElement>
    | ((node: HTMLDivElement | null) => void);
  headerHeight: number;
  columns: VirtualTableColumn<RowType>[];
  columnsStickyPosition: ColumnsStickyPosition;
}

export const TableHeader = memo(function <RowType extends object>({
  headerRef,
  headerHeight,
  columns,
  columnsStickyPosition,
}: Props<RowType>) {
  return (
    <div
      className="table-headers"
      ref={headerRef}
      style={{ height: headerHeight, width: scrollX || "100%" }}
    >
      {columns.map(({ title, width, align, fixed, display }, columnIndex) => {
        const stickyPosition = columnsStickyPosition[columnIndex];
        return (
          <div
            className={classNames("table-header", {
              fixed,
              left: fixed === "left",
              right: fixed === "right",
              last: stickyPosition?.isLast,
            })}
            key={columnIndex}
            style={{
              display: display !== "hidden" ? "flex" : "none",
              flex: `1 0 ${width}px`,
              justifyContent:
                align === "center"
                  ? "center"
                  : align === "right"
                  ? "flex-end"
                  : "flex-start",
              textAlign: align,
              left: fixed === "left" ? stickyPosition?.value : undefined,
              right: fixed === "right" ? stickyPosition?.value : undefined,
            }}
          >
            {title}
          </div>
        );
      })}
    </div>
  );
});
