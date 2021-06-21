import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../../types/RootState';
import { initialState } from './slice';
import { daysDifference } from 'utils/formatters/time';

const checkIsolationStatus = (start = '2021-01-04T22:39:31.826Z', end) => {
  const today = new Date();
  const endDate = new Date(end);
  if (!(start && end)) {
    return 'Isolating not required';
  }
  const difference = endDate.valueOf() - today.valueOf();
  return difference < 0 ? 'Isolating Completed' : 'Isolating';
};

const getIsolationDays = iso8601Duration => {
  if (!iso8601Duration) return null;
  const iso8601DurationRegex = /(-)?P(?:([.,\d]+)D)?/;

  const matches = iso8601Duration.match(iso8601DurationRegex);
  return matches[2];
};

const getDayOfIsolation = start => {
  if (!start) return null;
  const currentDate = new Date();
  const diff = daysDifference(start, currentDate.toString());
  return diff !== null ? diff + 2 : null;
};
// First select the relevant part from the state
const selectDomain = (state: RootState) =>
  state.infectionControl || initialState;

export const selectLoading = createSelector(
  [selectDomain],
  infectionControlSaga => infectionControlSaga.loading,
);

export const selectError = createSelector(
  [selectDomain],
  infectionControlSaga => infectionControlSaga.error,
);

export const selectPatient = createSelector(
  [selectDomain],
  infectionControlSaga => infectionControlSaga.patient,
);
export const selectPatientName = createSelector(
  [selectDomain],
  infectionControlSaga => infectionControlSaga.patient?.name,
);

export const selectPatientNHS = createSelector(
  [selectDomain],
  infectionControlSaga => infectionControlSaga.patient?.nhsnumber,
);

export const selectCovidStatus = createSelector(
  [selectDomain],
  infectionControlSaga =>
    infectionControlSaga.covidManagement?.suspectedCovidStatus,
);

export const selectCovidStatusDate = createSelector(
  [selectDomain],
  infectionControlSaga =>
    infectionControlSaga.covidManagement?.startTime?.slice(0, 10),
);

export const selectIsolationStatus = createSelector(
  [selectDomain],
  infectionControlSaga =>
    checkIsolationStatus(
      infectionControlSaga.covidManagement?.isolationRequest
        ?.dateIsolationDueToStart,
      infectionControlSaga.covidManagement?.isolationRequest
        ?.dateIsolationDueToEnd,
    ),
);

export const selectIsolationReason = createSelector(
  [selectDomain],
  infectionControlSaga =>
    infectionControlSaga.covidManagement?.isolationRequest?.reasonForIsolation,
);

export const selectEndOfIsolation = createSelector(
  [selectDomain],
  infectionControlSaga =>
    infectionControlSaga.covidManagement?.isolationRequest?.dateIsolationDueToEnd?.slice(
      0,
      10,
    ),
);

export const selectIsolationDays = createSelector(
  [selectDomain],
  infectionControlSaga =>
    getIsolationDays(
      infectionControlSaga.covidManagement?.isolationRequest?.isolationDuration,
    ),
);

export const selectDayOfIsolation = createSelector(
  [selectDomain],
  infectionControlSaga =>
    getDayOfIsolation(
      infectionControlSaga.covidManagement?.isolationRequest
        ?.dateIsolationDueToStart,
    ),
);
// Test status
export const selectTestRequestReason = createSelector(
  [selectDomain],
  infectionControlSaga =>
    infectionControlSaga.covidManagement?.covidTestRequest?.reasonForRequest,
);

export const selectTestRequestStatusUpdate = createSelector(
  [selectDomain],
  infectionControlSaga =>
    infectionControlSaga.covidManagement?.covidTestRequest?.statusTime.slice(
      0,
      10,
    ),
);

export const selectCurrentTestRequest = createSelector(
  [selectDomain],
  infectionControlSaga =>
    infectionControlSaga.covidManagement?.covidTestRequest?.status?.value,
);

export const selectCurrentTestResult = createSelector(
  [selectDomain],
  infectionControlSaga =>
    ({
      1321111000000101: 'Negative',
      1300721000000109: 'Positive',
      null: 'N/A',
    }[infectionControlSaga.covidManagement?.covidTestRequest?.status?.value]),
);

export const selectResultCS = createSelector(
  [selectDomain],
  infectionControlSaga => infectionControlSaga.update,
);

export const selectID = createSelector(
  [selectDomain],
  infectionControlSaga => infectionControlSaga?.patient?.id,
);
