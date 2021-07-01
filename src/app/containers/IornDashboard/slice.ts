/*
 * PatientList Slice
 *
 * Here we define:
 * - The shape of our container's slice of Redux store,
 * - All the actions which can be triggered for this slice, including their effects on the store.
 *
 * Note that, while we are using dot notation in our reducer, we are not actually mutating the state
 * manually. Under the hood, we use immer to apply these updates to a new copy of the state.
 * Please see https://immerjs.github.io/immer/docs/introduction for more information.
 *
 */

import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '../../../utils/@reduxjs/toolkit';
import { ContainerState, PatientsErrorType } from './types';
import { tPatientsList } from 'types';

// The initial state of the PatientList container
export const initialState: ContainerState = {
  loading: false,
  error: null,
  patientsList: [],
  filters: { sort: { value: 'DESC', key: 'news2' }, filter: null },
};

const patientsListFromSlice = createSlice({
  name: 'patientsList',
  initialState,
  reducers: {
    loadRecords(state, action) {
      state.loading = true;
      state.error = null;
      state.patientsList = [];
    },
    recordsLoaded(state, action: PayloadAction<tPatientsList[]>) {
      state.loading = false;
      state.error = null;
      const patientsList = action.payload;
      state.patientsList = patientsList;
    },
    recordsError(state, action: PayloadAction<PatientsErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
    addFilters(state, action) {
      const { sort, filter } = action.payload;
      state.filters.sort = sort;
      state.filters.filter = filter;
    },
  },
});

export const { actions, reducer, name: sliceKey } = patientsListFromSlice;
