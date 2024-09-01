import { CompanyAPI } from "@/shared/api/Company/company.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TCompany } from "../types/TCompany";
import { AddCompanyRequestDTO } from "@/shared/api/Company/dto/AddCompanyRequest.dto";
import {
  selectCompaniesEntities,
  selectCompaniesFilters,
  selectCompaniesUpdatingEntities,
} from "./companiesSlice";
import { RootState } from "@/app/store";

export const fetchCompanies = createAsyncThunk(
  "companies/fetch",
  async (_, { getState }) => {
    const filters = selectCompaniesFilters(getState() as RootState);

    return await CompanyAPI.fetchCompanies(filters);
  }
);

export const addCompany = createAsyncThunk<TCompany, AddCompanyRequestDTO>(
  "companies/add",
  async (company) => {
    return await CompanyAPI.addCompany(company);
  }
);

export const deleteCompany = createAsyncThunk<TCompany, TCompany["id"]>(
  "companies/delete",
  async (id) => {
    return await CompanyAPI.deleteCompany(id);
  }
);

export const deleteSelectedCompanies = createAsyncThunk(
  "companies/delete-selected",
  async (_, { getState }) => {
    const entities = selectCompaniesEntities(
      getState() as RootState
    );
    console.log(entities);

    const promises = Object.values(entities)
      .filter(({ selected }) => selected)
      .map(({ id }) => CompanyAPI.deleteCompany(id));

    return await Promise.all(promises);
  }
);

export const saveUpdatedCompanies = createAsyncThunk(
  "companies/save-updated",
  async (_, { getState }) => {
    const updatedEntities = selectCompaniesUpdatingEntities(
      getState() as RootState
    );
    const promises = Object.entries(updatedEntities).map(
      ([id, updatedFields]) => CompanyAPI.patchCompany(id, updatedFields)
    );
    return await Promise.all(promises);
  }
);
