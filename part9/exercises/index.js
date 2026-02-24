"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bmiCalculator_1 = require("./bmiCalculator");
var exerciseCalculator_1 = require("./exerciseCalculator");
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/hello', function (_req, res) {
    res.send('Hello Full Stack!');
});
app.get('/bmi', function (req, res) {
    var _a = req.query, height = _a.height, weight = _a.weight;
    if (!height || !weight) {
        res.status(400).send({ error: 'Height and mass are required' });
        return;
    }
    var h = Number(height);
    var w = Number(weight);
    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
        res.status(400).send({ error: 'malformatted parameters' });
        return;
    }
    var bmi = (0, bmiCalculator_1.calculateBmi)(h, w);
    res.json({
        height: height,
        weight: weight,
        bmi: bmi,
    });
});
app.post('/exercises', function (req, res) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    var _a = req.body, daily_exercises = _a.daily_exercises, target = _a.target;
    if (!target || !daily_exercises) {
        res.status(400).send({ error: 'target and dailyExercises are required' });
        return;
    }
    var dailyExercises = [];
    if (Array.isArray(daily_exercises) && !daily_exercises.some(function (v) { return isNaN(Number(v)); })) {
        dailyExercises = daily_exercises;
    }
    var targetNumber = Number(target);
    if (isNaN(targetNumber) || dailyExercises.length === 0) {
        res.status(400).send({ error: 'malformatted parameters' });
        return;
    }
    return res.json((0, exerciseCalculator_1.calculateExercises)(dailyExercises, targetNumber));
});
app.listen(3000, function () {
    console.log('Server is running on port 3000');
});
