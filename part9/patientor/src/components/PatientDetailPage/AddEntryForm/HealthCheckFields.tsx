import { InputLabel, Select, MenuItem } from '@mui/material';
import { HealthCheckRating } from "../../../types";

interface Props {
  healthCheckRating: HealthCheckRating;
  setHealthCheckRating: React.Dispatch<React.SetStateAction<HealthCheckRating>>;
}

const HealthCheckFields = ({ healthCheckRating, setHealthCheckRating }: Props) => {
  return (
    <>
      <InputLabel id="healthcheck-rating-label" style={{ marginTop: 20 }}>Healthcheck rating</InputLabel>
      <Select
        labelId="healthcheck-rating-label"
        label="Healthcheck rating"
        fullWidth
        value={healthCheckRating}
        onChange={(event) => setHealthCheckRating(Number(event.target.value) as HealthCheckRating)}
      >
        <MenuItem value={HealthCheckRating.Healthy}>Healthy</MenuItem>
        <MenuItem value={HealthCheckRating.LowRisk}>Low Risk</MenuItem>
        <MenuItem value={HealthCheckRating.HighRisk}>High Risk</MenuItem>
        <MenuItem value={HealthCheckRating.CriticalRisk}>Critical Risk</MenuItem>
      </Select>
    </>
  );
};

export default HealthCheckFields;
