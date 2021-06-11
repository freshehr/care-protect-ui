import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '../../../utils/@reduxjs/toolkit';
import { ContainerState, PatientOverviewErrorType } from './types';
import { IPatient, IAssessmentIcons } from 'types';
// The initial state of the PatientList container
export const initialState: ContainerState = {
  loading: false,
  error: null,
  patient: null,
  bodyMetrics: {},
};

const patientOverviewSlice = createSlice({
  name: 'patientOverview',
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
    recordError(state, action: PayloadAction<PatientOverviewErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions, reducer, name: sliceKey } = patientOverviewSlice;
