import {Patient} from "../../types.ts";
import {Box, Card, CardContent, Typography} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import WcIcon from "@mui/icons-material/Wc";
import BadgeIcon from "@mui/icons-material/Badge";
import WorkIcon from "@mui/icons-material/Work";

const PatientDetail = ({patient}: { patient: Patient }) => {
    return (
        <Card style={{marginBottom: '1.5rem'}}>
            <CardContent>
                <Typography variant="h4" gutterBottom>
                    Patient Details
                </Typography>

                <Box sx={{display: 'flex', alignItems: 'center', marginTop: 2}}>
                    <PersonIcon sx={{marginRight: 1}}/>
                    <Typography variant="body1">
                        <strong>Name:</strong> {patient.name}
                    </Typography>
                </Box>

                <Box sx={{display: 'flex', alignItems: 'center', marginTop: 1}}>
                    <WcIcon sx={{marginRight: 1}}/>
                    <Typography variant="body1">
                        <strong>Gender:</strong> {patient.gender}
                    </Typography>
                </Box>

                <Box sx={{display: 'flex', alignItems: 'center', marginTop: 1}}>
                    <BadgeIcon sx={{marginRight: 1}}/>
                    <Typography variant="body1">
                        <strong>SSN:</strong> {patient.ssn}
                    </Typography>
                </Box>

                <Box sx={{display: 'flex', alignItems: 'center', marginTop: 1}}>
                    <WorkIcon sx={{marginRight: 1}}/>
                    <Typography variant="body1">
                        <strong>Occupation:</strong> {patient.occupation}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default PatientDetail;