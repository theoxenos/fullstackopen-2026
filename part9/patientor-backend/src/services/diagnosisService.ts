import {Diagnosis} from "../types";
import diagnoses from "../../data/diagnoses";

const getDiagnosisByCode = (code: string): Diagnosis | undefined => {
    return diagnoses.find(diagnose => diagnose.code === code);
};

export default {
    getDiagnosisByCode
};