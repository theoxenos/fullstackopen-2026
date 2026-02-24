import { Box, Typography, TextField } from '@mui/material';

interface Props {
  dischargeDate: string;
  setDischargeDate: React.Dispatch<React.SetStateAction<string>>;
  dischargeCriteria: string;
  setDischargeCriteria: React.Dispatch<React.SetStateAction<string>>;
}

const HospitalFields = ({ 
  dischargeDate, 
  setDischargeDate, 
  dischargeCriteria, 
  setDischargeCriteria 
}: Props) => {
  return (
    <Box sx={{ mt: 2, p: 1, border: '1px solid #ccc', borderRadius: 1 }}>
      <Typography variant="subtitle1">Discharge</Typography>
      <TextField
        label="Date"
        type="date"
        fullWidth
        required
        value={dischargeDate}
        onChange={({ target }) => setDischargeDate(target.value)}
        margin="dense"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Criteria"
        fullWidth
        required
        value={dischargeCriteria}
        onChange={({ target }) => setDischargeCriteria(target.value)}
        margin="dense"
      />
    </Box>
  );
};

export default HospitalFields;
