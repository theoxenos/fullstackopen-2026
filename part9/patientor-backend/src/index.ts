import express from 'express';
import cors from 'cors';
import diagnosesRoutes from './routes/diagnoses';
import patientsRoutes from './routes/patients';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/ping', (_req, res) => {
    res.send('pong');
});

app.use('/api/diagnoses', diagnosesRoutes);
app.use('/api/patients', patientsRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});