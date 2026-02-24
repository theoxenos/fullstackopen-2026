"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateBmi = calculateBmi;
function calculateBmi(height, mass) {
    var heightInMeters = height / 100;
    var bmi = mass / Math.pow(heightInMeters, 2);
    if (bmi < 18.5) {
        return 'Underweight';
    }
    else if (bmi >= 18.5 && bmi < 25) {
        return 'Normal (healthy weight)';
    }
    else if (bmi >= 25 && bmi < 30) {
        return 'Overweight';
    }
    else {
        return 'Obese';
    }
}
var processArgs = function (args) {
    var height = Number(args[2]);
    var mass = Number(args[3]);
    if (isNaN(height) || isNaN(mass)) {
        throw new Error('Invalid height or mass');
    }
    return { height: height, mass: mass };
};
var main = function () {
    try {
        var _a = processArgs(process.argv), height = _a.height, mass = _a.mass;
        console.log(calculateBmi(height, mass));
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
};
if (require.main === module) {
    main();
}
