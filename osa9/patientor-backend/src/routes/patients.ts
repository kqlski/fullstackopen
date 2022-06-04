import express from 'express';
import patientService from '../services/patientService';
import toNewPatientData from '../utils';
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

export default router;