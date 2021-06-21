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
import { ContainerState, InfectionControlErrorType } from './types';
import { IPatient, IAssessmentIcons } from 'types';
// The initial state of the PatientList container
export const initialState: ContainerState = {
  loading: false,
  error: null,
  covidManagement: null,
  patient: null,
  update: {
    pending: false,
    success: false,
    error: null,
  },
};

const infectionControlSlice = createSlice({
  name: 'infectionControl',
  initialState,
  reducers: {
    loadRecord(state, action) {
      state.loading = true;
      state.error = null;
      state.patient = null;
    },
    recordLoaded(
      state,
      action: PayloadAction<
        IPatient & {
          assessment: IAssessmentIcons;
        }
      >,
    ) {
      state.loading = false;
      state.error = null;
      const patient = action.payload;
      state.patient = patient;
    },
    recordError(state, action: PayloadAction<InfectionControlErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
    loadInfectionControl(state, action) {
      state.loading = true;
      state.error = null;
      state.covidManagement = null;
      state.update.pending = false;
      state.update.success = false;
      state.update.error = null;
    },
    infectionControlLoaded(state, action) {
      state.loading = false;
      state.error = null;
      const covidManagement = action.payload;
      state.covidManagement = covidManagement;
    },
    infectionControlError(
      state,
      action: PayloadAction<InfectionControlErrorType>,
    ) {
      state.error = action.payload;
      state.loading = false;
    },

    pending(state, action) {
      state.update.pending = true;
      state.update.error = null;
      state.update.success = false;
    },
    success(state) {
      state.update.pending = false;
      state.update.success = true;
      state.update.error = null;
    },
    error(state, action) {
      state.update.pending = false;
      state.update.success = true;
      state.update.error = action.payload;
    },
    pendingRequestTest(state, action) {
      state.update.pending = true;
      state.update.error = null;
      state.update.success = false;
    },
  },
});

export const { actions, reducer, name: sliceKey } = infectionControlSlice;
