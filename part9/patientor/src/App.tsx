import {useEffect} from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientDetailPage from "./components/PatientDetailPage";

import {setDiagnoses, useDiagnosesValue} from "./reducers/DiagnosesReducer.tsx";
import diagnosesService from "./services/diagnoses";
import {setPatients, usePatientsValue} from "./reducers/PatientsReducer.tsx";


const App = () => {
  const {dispatchDiagnoses} = useDiagnosesValue();
  const {dispatchPatients} = usePatientsValue();

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
    
    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      dispatchPatients(setPatients(patients));
    };
    
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAllDiagnoses();
      dispatchDiagnoses(setDiagnoses(diagnoses));
    };
    
    void fetchPatientList();
    void fetchDiagnoses();
  }, [dispatchDiagnoses, dispatchPatients]);
  
  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage />} />
            <Route path="/patients/:id" element={<PatientDetailPage />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
