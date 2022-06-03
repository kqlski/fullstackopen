import express from 'express';
import { webBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());
app.get('/', (_req, res) => {
  res.send('Hello Full Stack');
});
app.get('/bmi', (req, res) => {
  const weight = Number(req.query?.weight);
  const height = Number(req.query?.height);
  if (!isNaN(weight) && (!isNaN(height))) {
    res.send({
      weight,
      height,
      bmi: webBmi(height, weight)
    });
  } else {
    res.send({
      error: "malformatted parameters"
    });
  }
});
app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;

  if (!target || !daily_exercises) {
    return res.send({
      error: "parameters missing"
    });
  }
  if (isNaN(Number(target)) || !Array.isArray(daily_exercises) || daily_exercises.length===0 || !daily_exercises.every(e => typeof e === 'number')) {
    return res.send({
      error: "malformatted parameters"
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return res.send(calculateExercises(daily_exercises,Number(target)));
});
const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});