import {Patient, EntryWithoutId} from "../../types.ts";
import {Box, Button} from '@mui/material';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import patientService from "../../services/patients.ts";
import PatientDetail from "./PatientDetail.tsx";
import PatientEntries from "./PatientEntries.tsx";
import AddEntryForm from "./AddEntryForm";
import { getErrorMessage } from "../../utils.ts";

const PatientDetailPage = () => {
    const params = useParams();
    const patientId = params.id;

    const [patient, setPatient] = useState<Patient>();
    const [showForm, setShowForm] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        (async () => {
            setPatient(await patientService.getById(patientId!));
        })();
    }, [patientId]);

    const submitNewEntry = async (values: EntryWithoutId) => {
        try {
            const entry = await patientService.addEntry(patientId!, values);
            if (patient) {
                setPatient({
                    ...patient,
                    entries: patient.entries.concat(entry)
                });
            }
            setShowForm(false);
            setError(undefined);
        } catch (e: unknown) {
            const message = getErrorMessage(e);
            console.error(message);
            setError(message);
        }
    };

    if (!patient) {
        return <div>Loading patient details...</div>;
    }

    return (
        <Box sx={{padding: 2}}>
            <PatientDetail patient={patient}/>
            {showForm ? (
                <AddEntryForm 
                    onSubmit={submitNewEntry} 
                    onCancel={() => setShowForm(false)} 
                    error={error}
                />
            ) : (
                <Button variant="contained" onClick={() => setShowForm(true)} sx={{ mt: 2, mb: 2 }}>
                    Add New Entry
                </Button>
            )}
            <PatientEntries entries={patient.entries}/>
        </Box>
    );
};

export default PatientDetailPage;