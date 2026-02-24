import express from 'express';
import {calculateBmi} from './bmiCalculator';
import {calculateExercises} from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const {height, weight} = req.query;

    if (!height || !weight) {
        res.status(400).send({error: 'Height and mass are required'});
        return;
    }

    const h = Number(height);
    const w = Number(weight);

    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
        res.status(400).send({error: 'malformatted parameters'});
        return;
    }

    const bmi = calculateBmi(h, w);
    res.json({
        height,
        weight,
        bmi,
    });
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target} = req.body;

    if (!target || !daily_exercises) {
        res.status(400).send({error: 'target and dailyExercises are required'});
        return;
    }

    let dailyExercises: number[] = [];
    if (Array.isArray(daily_exercises) && !daily_exercises.some((v) => isNaN(Number(v)))) {
        dailyExercises = daily_exercises as number[];
    }
    const targetNumber = Number(target);

    if (isNaN(targetNumber) || dailyExercises.length === 0) {
        res.status(400).send({error: 'malformatted parameters'});
        return;
    }

    return res.json(calculateExercises(dailyExercises, targetNumber));
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});