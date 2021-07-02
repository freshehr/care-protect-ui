import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state?.patient || initialState;

export const selectLoading = createSelector(
  [selectDomain],
  patient => patient.loading,
);

export const selectError = createSelector(
  [selectDomain],
  patient => patient.error,
);

export const selectPatient = createSelector(
  [selectDomain],
  patient => patient.patient,
);

export const selectName = createSelector(
  [selectDomain],
  patient => patient.patient?.name,
);

export const selectNHS = createSelector(
  [selectDomain],
  patient => patient.patient?.nhsnumber,
);
export const selectDOB = createSelector(
  [selectDomain],
  patient => patient.patient?.birthDate,
);

export const selectId = createSelector(
  [selectDomain],
  patient => patient.patient?.id,
);
