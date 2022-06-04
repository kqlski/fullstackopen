interface bmiArgs {
  height: number;
  weight: number;
}
const calculateBmi = (height: number, weight: number): void => {
  if (height === 0) throw Error('height cannot be 0');
  const bmi: number = weight / Math.pow(height / 100, 2);
  if (bmi < 16) return console.log('Underweight (Severe thinness)');
  if (bmi <= 16.9) return console.log('Underweight (Moderate thinness)');
  if (bmi <= 18.4) return console.log('Underweight (Mild thinness)');
  if (bmi <= 24.9) return console.log('Normal (healthy weight)');
  if (bmi <= 29.9) return console.log('Overweight (Pre-obese)');
  if (bmi <= 34.9) return console.log('Obese (Class I)');
  if (bmi <= 39.9) return console.log('Obese (Class II)');
  console.log('Obese (Class III)');
};
export const webBmi = (height: number, weight: number): string => {
  if (height === 0) throw Error('height cannot be 0');
  const bmi: number = weight / Math.pow(height / 100, 2);
  if (bmi < 16)    return 'Underweight (Severe thinness)';
  if (bmi <= 16.9) return 'Underweight (Moderate thinness)';
  if (bmi <= 18.4) return 'Underweight (Mild thinness)';
  if (bmi <= 24.9) return 'Normal (healthy weight)';
  if (bmi <= 29.9) return 'Overweight (Pre-obese)';
  if (bmi <= 34.9) return 'Obese (Class I)';
  if (bmi <= 39.9) return 'Obese (Class II)';
  return 'Obese (Class III)';
};


const parseBmiArgs = (args: Array<string>): bmiArgs => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('too many arguments');
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const { height, weight } = parseBmiArgs(process.argv);
  calculateBmi(height, weight);
} catch (e: unknown) {
  let msg = 'Something bad happened.';
  if (e instanceof Error) {
    msg += ' Error: ' + e.message;
  }
  console.log(msg);
}