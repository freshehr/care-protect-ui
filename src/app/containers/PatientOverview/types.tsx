import { IAssessmentIcons, IPatient } from 'types';
/* --- STATE --- */
export interface PatientOverview {
  loading: boolean;
  error?: PatientOverviewErrorType | null;
  patient:
    | null
    | (IPatient & {
        assessment: IAssessmentIcons;
      });
  bodyMetrics: {
    height?: number;
    weight?: number;
    bmi?: number;
  };
}

export enum PatientOverviewErrorType {
  RESPONSE_ERROR = 1,
  USER_HAS_NO_RECORDS = 2,
}

export type ContainerState = PatientOverview;
