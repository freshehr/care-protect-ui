import { put, takeLatest, delay } from 'redux-saga/effects';
import { actions } from './slice';
import { patientListParser, keysToCamel } from 'utils/formatters';
import { fake } from 'utils/fake';

export function* getPatient(action) {
  yield delay(500);

  const formatedPatientList = patientListParser(keysToCamel(fake.PATIENT_LIST));
  const patient = formatedPatientList.find(
    element => element.id === action.payload,
  );
  yield put(actions.patientLoaded(patient));
}

/**
 * Root saga manages watcher lifecycle
 */
export function* patientSaga() {
  yield takeLatest(actions.loadPatient.type, getPatient);
}
