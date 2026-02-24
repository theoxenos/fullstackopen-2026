import express, {NextFunction, Request, Response} from 'express';
import patients from '../../data/patients';
import {Diagnosis, Entry, NonSensitivePatient, Patient} from '../types';
import patientsService from '../services/patientsService';
import {EntrySchema, PatientSchema} from '../utils';
import z from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
    res.json(patients.map((patient) => ({
        name: patient.name,
        id: patient.id,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        occupation: patient.occupation
    })));
});

router.get('/:id', (req, res: Response<Patient>, next: NextFunction) => {
    const patient = patientsService.getPatientById(req.params.id);
    if (patient) {
        res.json(patient);
    } else {
        next('patient not found');
    }
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        PatientSchema.parse(req.body);
        next();
    }catch (error) {
        next(error);
    }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
    } else {
        res.status(400).send({ error: error instanceof Error ? error.message : String(error) });
    }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, Patient>, res: Response<Patient>) => {
    const newPatient = patientsService.addPatient(req.body);
    res.status(201).json(newPatient);
});

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        // we will just trust the data to be in correct form
        return [] as Array<Diagnosis['code']>;
    }

    return object.diagnosisCodes as Array<Diagnosis['code']>;
};

router.post('/:id/entries', (req: Request, res: Response<Entry>, next: NextFunction) => {
    try {
        const entry = EntrySchema.parse(req.body);
        entry.diagnosisCodes = parseDiagnosisCodes(req.body);
        const newEntry = patientsService.addEntry(req.params.id, entry);
        res.status(201).json(newEntry);
    } catch (error) {
        next(error);
    }
});

router.use(errorMiddleware);

export default router;