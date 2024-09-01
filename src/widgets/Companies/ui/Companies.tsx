import { useAppSelector, useAppDispatch } from "@/app/store";
import {
  selectCompanies,
  fetchCompanies,
  selectCompaniesStatus,
  selectTotalCompanies,
  selectCompaniesFilters,
  updateCompaniesFilters,
  selectCompaniesUpdatingEntities,
  saveUpdatedCompanies,
} from "@/entities/Company";
import { CompaniesTable } from "@/entities/Company/ui/CompaniesTable/CompaniesTable";
import { AddCompany } from "@/features/AddCompany";
import { Alert, AlertType, Button, Flex, InfiniteScroll } from "@/shared/ui";
import { useEffect, useState } from "react";
import cls from "./Companies.module.scss";
import { DeleteSelectedCompanies } from "@/features/DeleteSelectedCompanies";
import { getTotalPages } from "@/shared/utils/getTotalPages";

export const Companies = () => {
  const companies = useAppSelector(selectCompanies);
  const status = useAppSelector(selectCompaniesStatus);
  const total = useAppSelector(selectTotalCompanies);
  const filters = useAppSelector(selectCompaniesFilters);
  const updatingCompaniesEntities = useAppSelector(
    selectCompaniesUpdatingEntities
  );

  const dispatch = useAppDispatch();
  const [error, setError] = useState<null | string>(null);

  const totalPages = total ? getTotalPages(filters.count, total) : 0;

  useEffect(() => {
    dispatch(fetchCompanies())
      .unwrap()
      .catch((e) => setError(e.message));
  }, [dispatch, filters]);

  if (error) {
    return <Alert type={AlertType.Error}>Что-то пошло не так. {error}</Alert>;
  }

  return (
    <Flex direction="column" gap={15} className={cls.companies_container}>
      <h2>Компании</h2>
      <Flex gap={10} justify="flex-end">
        {!!Object.keys(updatingCompaniesEntities).length && (
          <Button className={cls.save_updated_btn} onClick={() => dispatch(saveUpdatedCompanies())}>
            Сохранить изменения
          </Button>
        )}
        <AddCompany />
        <DeleteSelectedCompanies />
      </Flex>
      <Flex direction="column" gap={10}>
        <CompaniesTable data={companies} />
        {totalPages > filters.page && (
          <InfiniteScroll
            onIntersection={() =>
              dispatch(updateCompaniesFilters({ page: filters.page + 1 }))
            }
            isLoading={status === "pending"}
          />
        )}
      </Flex>
    </Flex>
  );
};
