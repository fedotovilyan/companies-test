import { ReactNode } from "react";
import cls from "./Table.module.scss";
import classNames from "classnames";

export type TableDataType = Record<string | number, ReactNode>;

export interface IColumn<TData extends TableDataType> {
  title?: ReactNode;
  key: string | number;
  dataKey: keyof TData;
  render?: (row: TData) => ReactNode;
  className?: string;
}

interface TableProps<TData extends TableDataType> {
  columns: IColumn<TData>[];
  data: TData[];
  rowClassname?: string | ((record: TData) => string);
  caption?: ReactNode;
}

export const Table = <TData extends TableDataType>({
  columns,
  data,
  rowClassname,
  caption,
}: TableProps<TData>) => {
  return (
    <table>
      {caption && <caption>{caption}</caption>}
      <thead>
        <tr className={cls.table_row}>
          {columns.map((column) => (
            <th
              className={classNames(cls.table_head_cell, column.className)}
              key={column.key}
            >
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((value) => (
          <tr
            className={classNames(
              cls.table_row,
              typeof rowClassname === "string"
                ? rowClassname
                : rowClassname?.(value)
            )}
          >
            {columns.map(({ dataKey, render }) => (
              <td className={cls.table_cell}>
                {render ? render(value) : value[dataKey]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
