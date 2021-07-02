import { IPatient } from 'types/PatientDemographic';
import { IAssessmentIcons } from 'types/AssessmentIcons';

/* --- STATE --- */
export interface PatientState {
  loading: boolean;
  error?: PatientErrorType | null;
  patient:
    | (IPatient & {
        assessment: IAssessmentIcons;
      })
    | null;
}

export enum PatientErrorType {
  RESPONSE_ERROR = 1,
  NO_PATIENT = 2,
}

export type ContainerState = PatientState;
