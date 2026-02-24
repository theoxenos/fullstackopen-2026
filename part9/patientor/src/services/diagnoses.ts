import axios from "axios";
import {Diagnosis} from "../types";
import {apiBaseUrl} from "../constants";

const getAllDiagnoses = async (): Promise<Diagnosis[]> => {
    const {data} = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
    return data;
};

const getDiagnosisByCode = async (code: string): Promise<Diagnosis> => {
    const {data} = await axios.get<Diagnosis>(`${apiBaseUrl}/diagnoses/${code}`);
    return data;
};

export default {getAllDiagnoses, getDiagnosisByCode};