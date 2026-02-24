interface ExerciseArgs {
    dailyExerciseHours: number[];
    target: number;
}

interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const calculateExercises = (dailyExerciseHours: number[], target: number): ExerciseResult => {
    const periodLength = dailyExerciseHours.length;
    const totalHours = dailyExerciseHours.reduce((acc, current) => acc + current, 0);
    const trainingDays = dailyExerciseHours.filter(hours => hours > 0).length;
    const averageHours = totalHours / periodLength;
    
    let rating = 0;
    let ratingDescription = '';

    if (averageHours >= target) {
        rating = 3;
        ratingDescription = 'Good job, keep it up!';
    } else if (Math.round(averageHours) === target) {
        rating = 2;
        ratingDescription = 'Not too bad but could be better';
    } else if (averageHours < target) {
        rating = 1;
        ratingDescription = 'Not enough exercise, try harder';
    }

    return {
        average: averageHours,
        periodLength,
        rating,
        ratingDescription,
        success: averageHours >= target,
        target,
        trainingDays,
    };
};

const processExerciseArgs  = (args: string[]): ExerciseArgs => {
    // eslint-disable-next-line no-useless-escape
    const exerciseHoursString = args[2].replace(/[\[\]]/g, '');
    const dailyExerciseHours = exerciseHoursString.split(/[,;]/).map(Number);
    const target = Number(args[3]);

    if (isNaN(target) || dailyExerciseHours.some(isNaN)) {
        throw new Error('Invalid input: target and daily exercise hours must be numbers');
    }

    return {
        dailyExerciseHours,
        target
    };
};

try {
    if(require.main === module) {
        const {dailyExerciseHours, target} = processExerciseArgs(process.argv);
        console.log(calculateExercises(dailyExerciseHours, target));
    }
} catch (error) {
    if (error instanceof Error) {
        console.error('Error:', error.message);
    }
}