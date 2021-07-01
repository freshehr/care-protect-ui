import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../../types/RootState';
import { initialState } from './slice';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state?.patientsList || initialState;

export const selectLoading = createSelector(
  [selectDomain],
  patientsListFromSaga => patientsListFromSaga.loading,
);

export const selectError = createSelector(
  [selectDomain],
  patientsListFromSaga => patientsListFromSaga.error,
);

export const selectPatients = createSelector(
  [selectDomain],
  patientsListFromSaga => patientsListFromSaga.patientsList,
);

export const selectFilters = createSelector(
  [selectDomain],
  patientsListFromSaga => patientsListFromSaga.filters,
);
