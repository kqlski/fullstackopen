import { NewPatientData, NonSensitivePatientData, PatientData } from "../types";
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
const addPatient = (object: NewPatientData): PatientData => {
  const newPatient = { ...object, id: uuid() };
  patientEntries.push(newPatient);
  return newPatient;
};
export default {
  getEntries,
  getSafeEntries,
  addPatient
};