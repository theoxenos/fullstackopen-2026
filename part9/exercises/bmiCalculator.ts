interface CalculatorArgs {
    height: number;
    mass: number;
}

export function calculateBmi(height: number, mass: number): string {
    const heightInMeters = height / 100;
    const bmi = mass / Math.pow(heightInMeters, 2);

    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        return 'Normal (healthy weight)';
    } else if (bmi >= 25 && bmi < 30) {
        return 'Overweight';
    } else {
        return 'Obese';
    }
}

const processArgs = (args: string[]): CalculatorArgs => {
    const height = Number(args[2]);
    const mass = Number(args[3]);

    if (isNaN(height) || isNaN(mass)) {
        throw new Error('Invalid height or mass');
    }

    return {height, mass};
};

const main = () => {
    try {
        const {height, mass} = processArgs(process.argv);
        console.log(calculateBmi(height, mass));
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
};

if (require.main === module) {
    main();
}
