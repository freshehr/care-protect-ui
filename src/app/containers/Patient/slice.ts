import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { patientSaga } from './saga';
import { PatientState } from './types';

export const initialState: PatientState = {
  patient: null,
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    loadPatient(state, action) {
      state.loading = true;
      state.error = null;
      state.patient = null;
    },
    patientLoaded(state, action) {
      const patient = action.payload;
      state.patient = patient;
      state.loading = false;
    },
    // patientError(state, action: PayloadAction<PatientListErrorType>) {
    //   state.error = action.payload;
    //   state.loading = false;
    // },
  },
});

export const { actions, reducer } = slice;

export const usePatientSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: patientSaga });
  return { actions: slice.actions };
};
