import * as React from "react";

import {Card, CardContent, Typography} from "@mui/material";
import {Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry} from "../../types.ts";
import {useDiagnosesValue} from "../../reducers/DiagnosesReducer.tsx";
import {assertNever} from "../../utils.ts";

import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkIcon from '@mui/icons-material/Work';

interface BaseEntryProps {
    entry: Entry;
    icon: React.ReactNode;
    titleExtension?: React.ReactNode;
    children?: React.ReactNode;
}

const BaseEntry = ({entry, icon, titleExtension, children}: BaseEntryProps) => {
    const {diagnoses} = useDiagnosesValue();
    const patientDiagnoses = entry.diagnosisCodes?.map(code => diagnoses ? diagnoses[code] : null);

    return (
        <Card variant="outlined" style={{marginBottom: '10px', padding: '15px'}}>
            <Typography variant="h6">
                {entry.date} {icon} {titleExtension}
            </Typography>
            <Typography variant="body1" sx={{fontStyle: 'italic', color: 'text.secondary', mb: 1}}>
                {entry.description}
            </Typography>

            {patientDiagnoses && patientDiagnoses.length > 0 && (
                <>
                    <Typography variant="body2"><strong>Diagnoses:</strong></Typography>
                    <ul style={{paddingLeft: '20px'}}>
                        {patientDiagnoses.map((d, i) => d ? (
                            <li key={i}>
                                <Typography variant="body2">{d.code} {d.name}</Typography>
                            </li>
                        ) : null)}
                    </ul>
                </>
            )}

            {children}

            <Typography variant="body2" sx={{mt: 1}}>
                diagnosed by {entry.specialist}
            </Typography>
        </Card>
    );
};

const HealthCheckPatientEntry = ({entry}: { entry: HealthCheckEntry }) => {
    const iconColor = ['green', 'yellow', 'orange', 'red'];
    return (
        <BaseEntry entry={entry} icon={<MedicalServicesIcon/>}>
            <FavoriteIcon style={{color: iconColor[entry.healthCheckRating]}}/>
        </BaseEntry>
    );
};

const HospitalPatientEntry = ({entry}: { entry: HospitalEntry }) => {
    return (
        <BaseEntry entry={entry} icon={<MedicalServicesIcon/>}>
            <Typography variant="body1">
                <strong>Discharge:</strong> {entry.discharge.date} <em>{entry.discharge.criteria}</em>
            </Typography>
        </BaseEntry>
    );
};

const OccupationalHealthcarePatientEntry = ({entry}: { entry: OccupationalHealthcareEntry }) => {
    return (
        <BaseEntry entry={entry} icon={<WorkIcon/>} titleExtension={entry.employerName}/>
    );
};


const PatientEntries = ({entries}: { entries: Entry[] }) => {
    const {diagnoses} = useDiagnosesValue();

    if (!diagnoses) return null;

    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h4">Patient Entries</Typography>
                {entries && entries.map((entry) => {
                    switch (entry.type) {
                        case 'HealthCheck':
                            return <HealthCheckPatientEntry key={entry.id} entry={entry}/>;
                        case 'Hospital':
                            return <HospitalPatientEntry key={entry.id} entry={entry}/>;
                        case 'OccupationalHealthcare':
                            return <OccupationalHealthcarePatientEntry key={entry.id} entry={entry}/>;
                        default:
                            return assertNever(entry);
                    }
                })}
            </CardContent>
        </Card>
    );
};

export default PatientEntries;