import { Entry, NewEntry, NewPatientData, NonSensitivePatientData, PatientData } from "../types";
import patientEntries from "../../data/patients";
import { v1 as uuid } from 'uuid';

const getEntries = (): PatientData[] => {
  return patientEntries;
};
const getSafeEntries = (): NonSensitivePatientData[] => {
  return patientEntries.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};
const findPatientById = (id: string): PatientData | undefined => {
  return patientEntries.find(patient => patient.id === id);
};
const addPatient = (object: NewPatientData): PatientData => {
  const newPatient = { ...object, id: uuid() };
  patientEntries.push(newPatient);
  return newPatient;
};
const addEntry = (newEntry: NewEntry, patient: PatientData): PatientData => {
  const fullEntry: Entry = { ...newEntry, id: uuid() };
  patient.entries.push(fullEntry);
  return patient;
};
export default {
  getEntries,
  getSafeEntries,
  addPatient,
  addEntry,
  findPatientById
};