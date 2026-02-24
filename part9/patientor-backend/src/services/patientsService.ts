import patients from '../../data/patients';
import {v4 as uuidv4} from 'uuid';
import {Entry, EntryWithoutId, NewPatientEntry, Patient} from "../types";

const addPatient = (object: NewPatientEntry): Patient => {
    const newPatient: Patient = {
        id: uuidv4(),
        ...object
    };
    patients.push(newPatient);

    return newPatient;
};

const getPatientById = (id: string): Patient | undefined => {
    return patients.find(patient => patient.id === id);
};

const addEntry = (id: string, entry: EntryWithoutId): Entry => {
    const patient = getPatientById(id);
    if (!patient) {
        throw new Error('Patient not found');
    }
    const newEntry: Entry = {
        id: uuidv4(),
        ...entry
    };
    patient.entries.push(newEntry);

    return newEntry;
};

export default {addPatient, getPatientById, addEntry};