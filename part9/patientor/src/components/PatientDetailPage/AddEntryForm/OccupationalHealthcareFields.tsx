import { Box, Typography, TextField } from '@mui/material';

interface Props {
  employerName: string;
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
  sickLeaveStartDate: string;
  setSickLeaveStartDate: React.Dispatch<React.SetStateAction<string>>;
  sickLeaveEndDate: string;
  setSickLeaveEndDate: React.Dispatch<React.SetStateAction<string>>;
}

const OccupationalHealthcareFields = ({
  employerName,
  setEmployerName,
  sickLeaveStartDate,
  setSickLeaveStartDate,
  sickLeaveEndDate,
  setSickLeaveEndDate
}: Props) => {
  return (
    <>
      <TextField
        label="Employer Name"
        fullWidth
        required
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
        margin="dense"
      />
      <Box sx={{ mt: 2, p: 1, border: '1px solid #ccc', borderRadius: 1 }}>
        <Typography variant="subtitle1">Sick Leave</Typography>
        <TextField
          label="Start Date"
          type="date"
          fullWidth
          value={sickLeaveStartDate}
          onChange={({ target }) => setSickLeaveStartDate(target.value)}
          margin="dense"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Date"
          type="date"
          fullWidth
          value={sickLeaveEndDate}
          onChange={({ target }) => setSickLeaveEndDate(target.value)}
          margin="dense"
          InputLabelProps={{ shrink: true }}
        />
      </Box>
    </>
  );
};

export default OccupationalHealthcareFields;
