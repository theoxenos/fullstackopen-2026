import {Diagnosis} from "../types.ts";
import {createContext, Dispatch, ReactNode, useContext, useReducer} from "react";

const initialState: Record<string, Diagnosis> = {};

type Action =
    | { type: 'SET_DIAGNOSES'; payload: Diagnosis[] };

const reducer = (state: typeof initialState, action: Action) => {
    switch (action.type) {
        case 'SET_DIAGNOSES':
            return action.payload.reduce((memo, diagnosis) => ({...memo, [diagnosis.code]: diagnosis}), {});
        default:
            return state;
    }
};

export const setDiagnoses = (diagnoses: Diagnosis[]): Action => ({
    type: 'SET_DIAGNOSES',
    payload: diagnoses
});

interface IDiagnosesContext {
    diagnoses: Record<string, Diagnosis>;
    dispatchDiagnoses: Dispatch<Action>;
}

const DiagnosesContext = createContext<IDiagnosesContext | null>(null);

export const DiagnosesContextProvider = (props: { children: ReactNode }) => {
    const [diagnoses, dispatchDiagnoses] = useReducer(reducer, initialState);
    return (
        <DiagnosesContext.Provider value={{diagnoses, dispatchDiagnoses}}>
            {props.children}
        </DiagnosesContext.Provider>
    );
};

// Custom hook for easier consumption
export const useDiagnosesValue = () => {
    const context = useContext(DiagnosesContext);
    if (!context) {
        throw new Error("useDiagnosesValue must be used within a DiagnosesContextProvider");
    }
    return context;
};

export default DiagnosesContext;