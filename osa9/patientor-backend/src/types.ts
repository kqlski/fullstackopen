export type PatientData = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
};
export type NonSensitivePatientData = Omit<PatientData, 'ssn'>;

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