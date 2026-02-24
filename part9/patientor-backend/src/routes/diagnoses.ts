import express, {Response, Request} from 'express';
import diagnoses from '../../data/diagnoses';
import {Diagnosis, ErrorResponse} from "../types";
import diagnoseService from '../services/diagnosisService';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
    res.json(diagnoses);
});

router.get('/:code', (req: Request, res: Response<Diagnosis | ErrorResponse>) => {
    const code = req.params.code;
    if (!code) {
        return res.status(400).json({error: 'Invalid code'});
    }

    const diagnosis = diagnoseService.getDiagnosisByCode(code);
    if (diagnosis) {
        return res.json(diagnosis);
    } else {
        return res.status(404).json({error: 'Diagnosis not found'});
    }
});

export default router;