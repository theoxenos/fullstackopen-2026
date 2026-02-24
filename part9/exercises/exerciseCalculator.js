"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateExercises = void 0;
var calculateExercises = function (dailyExerciseHours, target) {
    var periodLength = dailyExerciseHours.length;
    var totalHours = dailyExerciseHours.reduce(function (acc, current) { return acc + current; }, 0);
    var trainingDays = dailyExerciseHours.filter(function (hours) { return hours > 0; }).length;
    var averageHours = totalHours / periodLength;
    var rating = 0;
    var ratingDescription = '';
    if (averageHours >= target) {
        rating = 3;
        ratingDescription = 'Good job, keep it up!';
    }
    else if (Math.round(averageHours) === target) {
        rating = 2;
        ratingDescription = 'Not too bad but could be better';
    }
    else if (averageHours < target) {
        rating = 1;
        ratingDescription = 'Not enough exercise, try harder';
    }
    return {
        average: averageHours,
        periodLength: periodLength,
        rating: rating,
        ratingDescription: ratingDescription,
        success: averageHours >= target,
        target: target,
        trainingDays: trainingDays,
    };
};
exports.calculateExercises = calculateExercises;
var processExerciseArgs = function (args) {
    // eslint-disable-next-line no-useless-escape
    var exerciseHoursString = args[2].replace(/[\[\]]/g, '');
    var dailyExerciseHours = exerciseHoursString.split(/[,;]/).map(Number);
    var target = Number(args[3]);
    if (isNaN(target) || dailyExerciseHours.some(isNaN)) {
        throw new Error('Invalid input: target and daily exercise hours must be numbers');
    }
    return {
        dailyExerciseHours: dailyExerciseHours,
        target: target
    };
};
try {
    if (require.main === module) {
        var _a = processExerciseArgs(process.argv), dailyExerciseHours = _a.dailyExerciseHours, target = _a.target;
        console.log((0, exports.calculateExercises)(dailyExerciseHours, target));
    }
}
catch (error) {
    if (error instanceof Error) {
        console.error('Error:', error.message);
    }
}
