interface exArgs {
  target: number;
  dailyHours: Array<number>;
}
interface exerciseData{
  periodLength:number;
  trainingDays:number;
  success:boolean;
  rating:number;
  ratingDescription:string;
  target:number;
  average:number;
}
const ratingDescriptions: Array<string> = [
  'much improvement needed',
  'not too bad but could be better',
  'Great Job!'];
export const calculateExercises = (dailyHours: Array<number>, target: number): exerciseData => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(d => d !== 0).length;
  const average = dailyHours.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  const rating = success ? 3 : average + 0.5 > target ? 2 : 1;
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription: ratingDescriptions[rating - 1],
    target,
    average
  };
};

const parseExArgs = (args: Array<string>): exArgs => {
  if (args.length < 4) throw new Error('not enough arguments');
  const target = Number(args[2]);
  if (isNaN(target)) throw new Error('provided target was not a number');
  const dailyHours: Array<number> = args.slice(3).map(n => Number(n));
  if (!dailyHours.every(h => !isNaN(h))) throw new Error('provided Hours were all numbers');
  return {
    target,
    dailyHours
  };
};

try {
  const { target, dailyHours } = parseExArgs(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (e: unknown) {
  let msg = 'Something bad Happened.';
  if (e instanceof Error) {
    msg += ' Error: ' + e.message;
  }
  console.log(msg);
}