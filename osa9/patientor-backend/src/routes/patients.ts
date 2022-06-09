import express from 'express';
import patientService from '../services/patientService';
import { toNewEntry, toNewPatientData } from '../utils';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getSafeEntries());
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatientData(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e: unknown) {
    let msg = 'Something bad happened.';
    if (e instanceof Error) {
      msg += ' Error: ' + e.message;
    }
    res.status(400).send(msg);
  }
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.findPatientById(id);
  if (!patient) {
    return res.sendStatus(404);
  }
  return res.send(patient);
});
router.post('/:id/entries', (req, res) => {
  try {

    const id = req.params.id;
    const patient = patientService.findPatientById(id);
    if (!patient) {
      return res.sendStatus(404);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEntry = toNewEntry(req.body);
    const updatedPatient = patientService.addEntry(newEntry, patient);
    return res.send(updatedPatient);
  } catch (e: unknown) {
    let msg = 'Something bad happened.';
    if (e instanceof Error) {
      msg += ' Error: ' + e.message;
    }
    return res.status(400).send(msg);
  }
});

export default router;