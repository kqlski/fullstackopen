import express from 'express';
import diagnosesEntries from '../../data/diagnoses';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosesEntries);
});

export default router;