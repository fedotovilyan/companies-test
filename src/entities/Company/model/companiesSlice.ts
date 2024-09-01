import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCompany } from "../types/TCompany.ts";
import {
  addCompany,
  deleteSelectedCompanies,
  fetchCompanies,
  saveUpdatedCompanies,
} from "./asyncThunks.ts";

export interface CompaniesFilters {
  count: number;
  page: number;
}

export type CompanyStateData = TCompany & { selected: boolean };

export interface CompaniesState {
  status: "idle" | "pending" | "success" | "error";
  entities: Record<CompanyStateData["id"], CompanyStateData>;
  ids: CompanyStateData["id"][];
  isSelectedAll: boolean;
  filters: CompaniesFilters;
  total: number;
  updatingEntities: Record<CompanyStateData["id"], CompanyStateData>;
}

const initialState: CompaniesState = {
  entities: {},
  ids: [],
  total: 0,
  status: "idle",
  isSelectedAll: false,
  updatingEntities: {},
  filters: {
    count: 15,
    page: 1,
  },
};

export const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    updateCompaniesFilters: (
      state,
      { payload }: PayloadAction<Partial<CompaniesFilters>>
    ) => {
      state.filters = {
        ...state.filters,
        ...payload,
      };
    },
    updateCompanySelection: (state, { payload }: PayloadAction<{id: TCompany["id"], selected: boolean}>) => {
      state.entities[payload.id].selected = payload.selected;
    },
    updateCompaniesIsSelectedAll: (
      state,
      { payload }: PayloadAction<CompaniesState["isSelectedAll"]>
    ) => {
      state.isSelectedAll = payload;
      state.ids.forEach((id) => {
        state.entities[id].selected = payload;
      });
    },
    updateEntity: (
      state,
      {
        payload,
      }: PayloadAction<{
        id: CompanyStateData["id"];
        update: Partial<CompanyStateData>;
      }>
    ) => {
      state.updatingEntities[payload.id] = {
        ...state.updatingEntities[payload.id],
        ...payload.update,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchCompanies.fulfilled, (state, { payload }) => {
        state.status = "success";

        state.total = payload.items;

        if (state.filters.page === 1) {
          state.entities = {};
          state.ids = [];
        }
        for (const company of payload.data) {
          const id = company.id;
          state.entities[id] = { ...company, selected: state.isSelectedAll };
          state.ids.push(id);
        }
        state.ids = Array.from(new Set(state.ids));
      })
      .addCase(fetchCompanies.rejected, (state) => {
        state.status = "error";
      });

    builder
      .addCase(addCompany.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addCompany.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.entities[payload.id] = { ...payload, selected: false };
        state.ids.push(payload.id);
      })
      .addCase(addCompany.rejected, (state) => {
        state.status = "error";
      });

    builder
      .addCase(deleteSelectedCompanies.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteSelectedCompanies.fulfilled, (state, { payload }) => {
        state.status = "success";
        if (payload) {
          const selectedCompaniesIds = Object.values(state.entities)
            .filter(({ selected }) => selected)
            .map(({ id }) => id);
          selectedCompaniesIds.forEach((id) => {
            delete state.entities[id];
          });
          const set = new Set(selectedCompaniesIds);
          state.ids = state.ids.filter((id) => !set.has(id));
        }
      })
      .addCase(deleteSelectedCompanies.rejected, (state) => {
        state.status = "error";
      });

    builder
      .addCase(saveUpdatedCompanies.pending, (state) => {
        state.status = "pending";
      })
      .addCase(saveUpdatedCompanies.fulfilled, (state) => {
        state.status = "success";

        Object.entries(state.updatingEntities).forEach(([id, entity]) => {
          state.entities[id] = {
            ...state.entities[id],
            ...entity,
          };
        });
        state.updatingEntities = {};
      })
      .addCase(saveUpdatedCompanies.rejected, (state) => {
        state.status = "error";
      });
  },
  selectors: {
    selectCompaniesEntities: (state) => state.entities,
    selectCompaniesIds: (state) => state.ids,
    selectCompaniesFilters: (state) => state.filters,
    selectCompaniesStatus: (state) => state.status,
    selectIsSelectedAllCompanies: (state) => state.isSelectedAll,
    selectTotalCompanies: (state) => state.total,
    selectCompaniesUpdatingEntities: (state) => state.updatingEntities,
    selectCompaniesState: (state) => state,
  },
});

export const {
  selectCompaniesState,
  selectCompaniesEntities,
  selectCompaniesIds,
  selectCompaniesFilters,
  selectCompaniesStatus,
  selectIsSelectedAllCompanies,
  selectTotalCompanies,
  selectCompaniesUpdatingEntities,
} = companiesSlice.selectors;

export const {
  updateCompaniesFilters,
  updateCompanySelection,
  updateCompaniesIsSelectedAll,
  updateEntity,
} = companiesSlice.actions;
