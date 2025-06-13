import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Box,
  Divider,
} from '@mui/material';
import background from "../images/background.jpg";
import PersonIcon from '@mui/icons-material/Person';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HealingIcon from '@mui/icons-material/Healing';
import CakeIcon from '@mui/icons-material/Cake';
import CategoryIcon from '@mui/icons-material/Category';
import InfoIcon from '@mui/icons-material/Info';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import NoteIcon from '@mui/icons-material/Note';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function TabPanel({ value, index, children }) {
  return value === index ? <Box sx={{ pt: 2 }}>{children}</Box> : null;
}

export default function PatientInfo() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [tab, setTab] = useState(0);

  useEffect(() => {
      const fetchPatient = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await api.get(`/patients/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setPatient(response.data);
        } catch (error) {
          console.error('Failed to fetch patient:', error);
          setFetchError('Patient not found.');
        } 
      };

    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get(`patients/${id}/notes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(response.data);
      } catch (error) {
        console.error('Failed to fetch notes:', error);
      }
    };
    Promise.all([fetchPatient(), fetchNotes()]).finally(() => setLoading(false));
  }, [id]);

  const calculateAge = (birthDate) => {
    if (!birthDate) return 'N/A';
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    if (
      today.getMonth() < birth.getMonth() ||
      (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  if (loading) return <CircularProgress />;
  if (fetchError) return <Alert severity="error">{fetchError}</Alert>;
  if (!patient) return null;

  return (
    <Box
      sx={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Card elevation={4} sx={{ p: 3 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}>
                <PersonIcon fontSize="large" />
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h4">{patient.name}</Typography>
              <Typography color="text.secondary">
                ID: {patient.id}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Tabs */}
          <Tabs
            value={tab}
            onChange={(_, newValue) => setTab(newValue)}
            textColor="primary"
            indicatorColor="primary"
            variant="fullWidth"
          >
            <Tab label="General Patient Information" icon={<InfoIcon />} iconPosition="start" />
            <Tab label="Clinical History" icon={<MedicalServicesIcon />} iconPosition="start" />
            <Tab label="Medical Notes" icon={<NoteIcon />} iconPosition="start" />
          </Tabs>

          {/* Tab Panels */}
          <CardContent>
            <TabPanel value={tab} index={0}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <CakeIcon color="action" />
                    <Typography><strong>Age:</strong> {calculateAge(patient.birthDate)} anos</Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <HealingIcon color="action" />
                    <Typography><strong>Diagnosis:</strong> {patient.diagnosis}</Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <CategoryIcon color="action" />
                    <Typography><strong>Diagnosis Category</strong> {patient.diagnosis_category}</Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <LocalHospitalIcon color="action" />
                    <Typography><strong>Hospital:</strong> {patient.hospital}</Typography>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <InfoIcon color="action" />
                    <Typography><strong>Status:</strong> {patient.active ? 'Active' : 'Inactive'}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>

              <TabPanel value={tab} index={1}>
                  {patient.clinicalHistory && patient.clinicalHistory.length > 0 ? (
                      <List>
                      {patient.clinicalHistory.map((record) => (
                          <ListItem key={record.id} alignItems="flex-start">
                          <ListItemText
                              primary={`[${new Date(record.recordDate).toLocaleString()}] ${record.recordType}`}
                              secondary={record.description}
                          />
                          </ListItem>
                      ))}
                      </List>
                  ) : (
                      <Typography>No Clinical History Available</Typography>
                  )}
                  </TabPanel>

                  <TabPanel value={tab} index={2}>
                  {notes.length > 0 ? (
                      <List>
                      {notes.map((note) => (
                          <ListItem key={note.id} alignItems="flex-start">
                          <ListItemText
                              primary={`[${new Date(note.noteDate).toLocaleString()}] - ${note.authorUsername || 'Unknown Author'}`}
                              secondary={note.content}
                          />
                          </ListItem>
                      ))}
                      </List>
                  ) : (
                      <Typography>There are no Notes for this patient</Typography>
                  )}
              </TabPanel>


          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
