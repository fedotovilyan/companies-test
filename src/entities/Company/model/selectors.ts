import { createSelector } from '@reduxjs/toolkit';
import { selectCompaniesEntities, selectCompaniesIds } from './companiesSlice';

export const selectCompanies = createSelector(
  selectCompaniesIds,
  selectCompaniesEntities,
  (ids, entities) => {
		return ids.map((id) => entities[id]);
	}
);