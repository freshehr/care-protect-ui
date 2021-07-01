import { tPatientsList } from 'types';
/* --- STATE --- */
export interface PatientsList {
  loading: boolean;
  error?: PatientsErrorType | null;
  patientsList: [] | tPatientsList[];
  filters: { sort: null | any; filter: null | any };
}

export enum PatientsErrorType {
  RESPONSE_ERROR = 1,
  USER_HAS_NO_RECORDS = 'There are no results',
}

export type ContainerState = PatientsList;
