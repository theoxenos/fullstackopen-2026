import { TextField, InputLabel, Select, MenuItem, Box, Chip, OutlinedInput, SelectChangeEvent } from '@mui/material';
import { useDiagnosesValue } from "../../../reducers/DiagnosesReducer";

interface Props {
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  specialist: string;
  setSpecialist: React.Dispatch<React.SetStateAction<string>>;
  diagnosisCodes: string[];
  setDiagnosisCodes: React.Dispatch<React.SetStateAction<string[]>>;
}

const BaseEntryFields = ({
  description,
  setDescription,
  date,
  setDate,
  specialist,
  setSpecialist,
  diagnosisCodes,
  setDiagnosisCodes
}: Props) => {
  const { diagnoses } = useDiagnosesValue();

  const handleDiagnosisChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <>
      <TextField
        label="Description"
        fullWidth
        required
        value={description}
        onChange={({ target }) => setDescription(target.value)}
        margin="dense"
      />
      <TextField
        label="Date"
        type="date"
        fullWidth
        required
        value={date}
        onChange={({ target }) => setDate(target.value)}
        margin="dense"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Specialist"
        fullWidth
        required
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
        margin="dense"
      />
      
      <InputLabel id="diagnosis-codes-label" sx={{ mt: 2 }}>Diagnosis codes</InputLabel>
      <Select
        labelId="diagnosis-codes-label"
        multiple
        fullWidth
        value={diagnosisCodes}
        onChange={handleDiagnosisChange}
        input={<OutlinedInput label="Diagnosis codes" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {Object.keys(diagnoses).map((code) => (
          <MenuItem key={code} value={code}>
            {code} {diagnoses[code].name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default BaseEntryFields;
