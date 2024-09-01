import { Flex, IColumn, Input, Table } from "@/shared/ui";
import { useId } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
  CompanyStateData,
  selectCompaniesUpdatingEntities,
  updateCompaniesIsSelectedAll,
  updateCompanySelection,
  updateEntity,
} from "../../model/companiesSlice";
import cls from "./CompaniesTable.module.scss";

interface CompaniesTableProps {
  data: CompanyStateData[];
}

export const CompaniesTable = ({ data }: CompaniesTableProps) => {
  const id = useId();
  const dispatch = useAppDispatch();
  const updatingEntities = useAppSelector(selectCompaniesUpdatingEntities);

  const columns: IColumn<CompanyStateData>[] = [
    {
      dataKey: "selected",
      key: "column-selected",
      title: "Выделить",
      render: (row) => (
        <input
          type="checkbox"
          checked={row.selected}
          onChange={(e) => {
            dispatch(updateCompanySelection({id: row.id, selected: e.target.checked}));
          }}
        />
      ),
      className: cls.selected_column,
    },
    {
      dataKey: "name",
      key: "column-name",
      title: "Название",
      render: (row) => (
        <Input
          theme="transparent"
          value={updatingEntities[row.id]?.name || row.name}
          onChange={(e) =>
            dispatch(
              updateEntity({ id: row.id, update: { name: e.target.value } })
            )
          }
        />
      ),
    },
    {
      dataKey: "address",
      key: "column-address",
      title: "Адрес",
      render: (row) => (
        <Input
          theme="transparent"
          value={updatingEntities[row.id]?.address || row.address}
          onChange={(e) =>
            dispatch(
              updateEntity({ id: row.id, update: { address: e.target.value } })
            )
          }
        />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={data}
      caption={
        <Flex>
          <label htmlFor={id}>Выделить все</label>
          <input
            id={id}
            type="checkbox"
            onChange={(e) =>
              dispatch(updateCompaniesIsSelectedAll(e.target.checked))
            }
          />
        </Flex>
      }
      rowClassname={(row) => (row.selected ? cls.selected : "")}
    />
  );
};
