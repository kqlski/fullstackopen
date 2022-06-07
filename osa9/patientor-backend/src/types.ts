// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry{

}
export interface PatientData {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries:Entry[];
}
export type NonSensitivePatientData = Omit<PatientData, 'ssn'|'entries'>;

export type NewPatientData = Omit<PatientData, 'id'>;

export type diagnoseData = {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}