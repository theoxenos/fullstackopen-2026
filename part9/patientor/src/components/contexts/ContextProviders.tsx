import {DiagnosesContextProvider} from "../../reducers/DiagnosesReducer.tsx";
import {PatientsContextProvider} from "../../reducers/PatientsReducer";
import {ReactNode} from "react";

const ContextProviders = ({children}: {children: ReactNode}) => {
    return (
        <PatientsContextProvider>
            <DiagnosesContextProvider>
                {children}
            </DiagnosesContextProvider>
        </PatientsContextProvider>
    );
};

export default ContextProviders;