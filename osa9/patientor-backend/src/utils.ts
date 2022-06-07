import { Entry, EntryTypes, Gender, NewPatientData } from "./types";

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: unknown };

const toNewPatientData = ({ name, dateOfBirth, ssn, gender, occupation, entries }: Fields): NewPatientData => {
  const newPatient: NewPatientData = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    entries: parseEntries(entries)
  };
  return newPatient;
};
const parseString = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('incorrect or missing name: ' + name);
  }
  return name;
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
  if (!entries || !isEntries(entries)) {
    throw new Error('incorrect Entries: ' + entries);
  }
  return entries;
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
const isEntries = (param: any): param is Entry[] => {
  return Array.isArray(param) && param.every(entry => isEntry(entry));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntry = (param: any): param is Entry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return param instanceof Object && Object.values(EntryTypes).includes(param.type);
};


export default toNewPatientData;