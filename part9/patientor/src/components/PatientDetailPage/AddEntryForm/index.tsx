import { useState, SyntheticEvent } from "react";
import { InputLabel, MenuItem, Select, Grid, Button, Box, Typography, Alert, SelectChangeEvent } from '@mui/material';
import { EntryWithoutId, HealthCheckRating } from "../../../types";
import HealthCheckFields from "./HealthCheckFields";
import HospitalFields from "./HospitalFields";
import OccupationalHealthcareFields from "./OccupationalHealthcareFields";
import BaseEntryFields from "./BaseEntryFields";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  error?: string;
}

const AddEntryForm = ({ onCancel, onSubmit, error }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [type, setType] = useState<"HealthCheck" | "Hospital" | "OccupationalHealthcare">("HealthCheck");

  // HealthCheck fields
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);

  // Hospital fields
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  // OccupationalHealthcare fields
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes
    };

    switch (type) {
      case "HealthCheck":
        onSubmit({
          ...baseEntry,
          type: "HealthCheck",
          healthCheckRating
        });
        break;
      case "Hospital":
        onSubmit({
          ...baseEntry,
          type: "Hospital",
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria
          }
        });
        break;
      case "OccupationalHealthcare":
        onSubmit({
          ...baseEntry,
          type: "OccupationalHealthcare",
          employerName,
          sickLeave: sickLeaveStartDate && sickLeaveEndDate ? {
            startDate: sickLeaveStartDate,
            endDate: sickLeaveEndDate
          } : undefined
        });
        break;
    }
  };

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    const value = event.target.value as "HealthCheck" | "Hospital" | "OccupationalHealthcare";
    setType(value);
  };

  return (
    <Box sx={{ border: '2px dashed gray', padding: 2, marginBottom: 2, marginTop: 2 }}>
      <Typography variant="h6" style={{ marginBottom: 10 }}>New {type} entry</Typography>
      {error && <Alert severity="error" style={{ marginBottom: 10 }}>{error}</Alert>}
      <form onSubmit={addEntry}>
        <InputLabel id="entry-type-label" style={{ marginTop: 10 }}>Entry type</InputLabel>
        <Select
          labelId="entry-type-label"
          label="Entry type"
          fullWidth
          value={type}
          onChange={onTypeChange}
          margin="dense"
        >
          <MenuItem value="HealthCheck">HealthCheck</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">OccupationalHealthcare</MenuItem>
        </Select>

        <BaseEntryFields
          description={description}
          setDescription={setDescription}
          date={date}
          setDate={setDate}
          specialist={specialist}
          setSpecialist={setSpecialist}
          diagnosisCodes={diagnosisCodes}
          setDiagnosisCodes={setDiagnosisCodes}
        />

        {type === "HealthCheck" && (
          <HealthCheckFields 
            healthCheckRating={healthCheckRating} 
            setHealthCheckRating={setHealthCheckRating} 
          />
        )}

        {type === "Hospital" && (
          <HospitalFields 
            dischargeDate={dischargeDate} 
            setDischargeDate={setDischargeDate} 
            dischargeCriteria={dischargeCriteria} 
            setDischargeCriteria={setDischargeCriteria} 
          />
        )}

        {type === "OccupationalHealthcare" && (
          <OccupationalHealthcareFields 
            employerName={employerName} 
            setEmployerName={setEmployerName} 
            sickLeaveStartDate={sickLeaveStartDate} 
            setSickLeaveStartDate={setSickLeaveStartDate} 
            sickLeaveEndDate={sickLeaveEndDate} 
            setSickLeaveEndDate={setSickLeaveEndDate} 
          />
        )}

        <Grid container spacing={2} sx={{ marginTop: 1 }}>
          <Grid item xs={6}>
            <Button
              color="secondary"
              variant="contained"
              fullWidth
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ float: "right" }}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddEntryForm;
