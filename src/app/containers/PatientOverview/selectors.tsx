import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../types/RootState';
import { initialState } from './slice';
import { patientOverviewSaga } from './saga';

const selectDomain = (state: RootState) =>
  state.patientOverview || initialState;

export const selectLoading = createSelector(
  [selectDomain],
  patientOverview => patientOverview.loading,
);

export const selectError = createSelector(
  [selectDomain],
  patientOverview => patientOverview.error,
);

export const selectPatient = createSelector(
  [selectDomain],
  patientOverview => patientOverview.patient,
);

export const selectBodyMetrics = createSelector(
  [selectDomain],
  patientOverview => patientOverview.bodyMetrics,
);
