import {Patient} from "../types";
import {createContext, Dispatch, ReactNode, useContext, useReducer} from "react";

const initialState: Patient[] = [];

type Action =
    | { type: 'SET_PATIENTS', payload: Patient[] }
    | { type: 'ADD_PATIENT', payload: Patient }
    | { type: 'EDIT_PATIENT', payload: Patient }
    | { type: 'DELETE_PATIENT', payload: string };

const reducer = (state: Patient[], action: Action): Patient[] => {
    switch (action.type) {
        case 'SET_PATIENTS':
            return action.payload;
        case 'ADD_PATIENT':
            return [...state, action.payload];
        case 'EDIT_PATIENT':
            return state.map(patient => patient.id === action.payload.id ? action.payload : patient);
        case 'DELETE_PATIENT':
            return state.filter(patient => patient.id !== action.payload);
        default:
            return state;
    }
};

export const addPatient = (patient: Patient): Action => {
    return {type: 'ADD_PATIENT', payload: patient};
};

export const setPatients = (patients: Patient[]): Action => {
    return {type: 'SET_PATIENTS', payload: patients};
};

interface IPatientsContext {
    patients: Patient[];
    dispatchPatients: Dispatch<Action>;
}

const PatientsContext = createContext<IPatientsContext | null>(null);

export const PatientsContextProvider = ({children}: {children: ReactNode}) => {
    const [patients, dispatchPatients] = useReducer(reducer, initialState);
    return (
        <PatientsContext.Provider value={{patients, dispatchPatients}}>
            {children}
        </PatientsContext.Provider>
    );
};

export const usePatientsValue = () => {
    const context = useContext(PatientsContext);
    if (!context) {
        throw new Error('usePatientsValue must be used within PatientsContextProvider');
    }
    return context;
};

export default PatientsContext;