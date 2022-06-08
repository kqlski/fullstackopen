import diagnosesEntries from "../data/diagnoses";
import { Diagnosis, Discharge, Entry, EntryTypes, Gender, HealthCheckRating, NewEntry, NewPatientData, SickLeave } from "./types";

type NewPatientFields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: unknown };

export const toNewPatientData = ({ name, dateOfBirth, ssn, gender, occupation, entries }: NewPatientFields): NewPatientData => {
  const newPatient: NewPatientData = {
    name: parseString(name, 'name'),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation, 'occupation'),
    entries: parseEntries(entries)
  };
  return newPatient;
};

type NewEntryFields = {
  date: unknown,
  type: unknown,
  specialist: unknown,
  diagnosisCodes: unknown,
  description: unknown,
  discharge: unknown,
  employerName: unknown,
  sickLeave: unknown,
  healthCheckRating: unknown
};
export const toNewEntry = ({ date, type, specialist, diagnosisCodes, description, discharge, employerName, sickLeave, healthCheckRating }: NewEntryFields): NewEntry => {
  if (!isEntryType(type)) {
    throw new Error('Incorrect or missing Entry type: ' + type);
  }
  switch (type) {
    case 'OccupationalHealthcare':
      const occupationalHealthcareEntry: NewEntry = {
        type,
        date: parseDate(date),
        description: parseString(description, 'description'),
        specialist: parseString(specialist, 'specialist'),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        employerName: parseString(employerName, 'employer name'),
        sickLeave: parseSickLeave(sickLeave)
      };
      return occupationalHealthcareEntry;
    case 'HealthCheck':
      const healthCheckEntry: NewEntry = {
        type,
        date: parseDate(date),
        description: parseString(description, 'description'),
        specialist: parseString(specialist, 'specialist'),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        healthCheckRating: parseHealthCheckRating(healthCheckRating)
      };
      return healthCheckEntry;
    case 'Hospital':
      const hospitalEntry: NewEntry = {
        type,
        date: parseDate(date),
        description: parseString(description, 'description'),
        specialist: parseString(specialist, 'specialist'),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        discharge: parseDischarge(discharge)
      };
      return hospitalEntry;
    default:
      return assertNever(type);
  }
};
const parseString = (string: unknown, paramName: string): string => {
  if (!string || !isString(string)) {
    throw new Error(`incorrect or missing ${paramName}: ` + string);
  }
  return string;
};
const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};
const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn) || !isSSN(ssn)) {
    throw new Error('Incorrect or missing SSN: ' + ssn);
  }
  return ssn;
};
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};
const parseEntries = (entries: unknown): Entry[] => {
  if (!entries) {
    return [];
  }
  if (!isEntries(entries)) {
    throw new Error('incorrect entries: ' + entries);
  }
  return entries;
};
const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnosis['code']> => {
  if (!diagnosisCodes) {
    return [];
  }
  if (!isDiagnosisCodes(diagnosisCodes)) {
    throw new Error('incorrect diagnosisCodes: ' + diagnosisCodes);
  }
  return diagnosisCodes;
};
const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error('incorrect sickLeave: ' + sickLeave);
  }
  return sickLeave;
};
const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
  }
  return healthCheckRating;
};
const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge: ' + discharge);
  }
  return discharge;
};
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};
const isSSN = (ssn: string): boolean => {
  const regex = /([0-2]\d|3[0-1])(0\d|1[0-2])\d{2}[-A]\d\d[\w]{1,2}/;
  return regex.test(ssn);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};
const isEntries = (param: unknown): param is Entry[] => {
  return Array.isArray(param) && param.every(entry => isEntry(entry));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntry = (param: any): param is Entry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return param instanceof Object && 'type' in param &&Object.values(EntryTypes).includes(param.type);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (param: any): param is Entry['type'] => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EntryTypes).includes(param);
};
const isDiagnosisCodes = (param: unknown): param is Array<Diagnosis['code']> => {
  return Array.isArray(param) && param.every(code => isString(code) && diagnosesEntries.map(diag => diag.code).includes(code));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (param: any): param is SickLeave => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return param instanceof Object && 'startDate' in param && 'endDate' in param && isString(param.startDate) && isDate(param.startDate) && isString(param.endDate) && isDate(param.endDate);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (param: any): param is Discharge => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return param instanceof Object && 'date' in param && 'criteria' in param && isString(param.date) && isDate(param.date) && isString(param.criteria);
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};