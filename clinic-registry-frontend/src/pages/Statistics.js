import React, { useEffect, useState, useCallback } from 'react';
import api from '../api/api';
import {
  Box,
  Container,
  MenuItem,
  Select,
  Typography,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import { PieChart } from '@mui/x-charts';
import CloseIcon from '@mui/icons-material/Close';

const statisticOptions = [
  { value: 'patientsPerHospital', label: 'Patients per Hospital' },
  { value: 'patientsPerDiagnosisCategory', label: 'Patients per Diagnosis Category' },
  { value: 'patientsPerStatus', label: 'Patients per Status (Active/Inactive)' },
];

export default function Statistics() {
  const [selectedStat, setSelectedStat] = useState('patientsPerHospital');
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [patientsInGroup, setPatientsInGroup] = useState([]);
  const [patientsLoading, setPatientsLoading] = useState(false);

  const fetchStatistics = useCallback(async () => {
    setLoading(true);
    setFetchError('');
    const token = localStorage.getItem('token');
    try {
      let response;

      switch (selectedStat) {
        case 'patientsPerHospital':
          response = await api.get('/patients/patients-per-hospital', {
            headers: { Authorization: `Bearer ${token}` },
          });
          break;
        case 'patientsPerDiagnosisCategory':
          response = await api.get('/patients/patients-per-diagnosis-category', {
            headers: { Authorization: `Bearer ${token}` },
          });
          break;
        case 'patientsPerStatus':
          response = await api.get('/patients/patients-per-status', {
            headers: { Authorization: `Bearer ${token}` },
          });
          break;
        default:
          response = { data: [] };
      }

      const pieData = response.data.map((item, index) => ({
        id: index,
        label: item.label,
        value: item.value ?? item.count,
      }));

      setChartData(pieData);
    } catch (error) {
      console.error('Error fetching statistics:', error);
      setFetchError('Failed to load statistics.');
      setChartData([]);
    } finally {
      setLoading(false);
    }
  }, [selectedStat]);

  const handleSliceClick = async (event, slice) => {
    const label = chartData[slice.dataIndex].label;
    setSelectedGroup(label);
    setPatientsLoading(true);
    try {
      const token = localStorage.getItem('token');
      let endpoint;

      switch (selectedStat) {
        case 'patientsPerHospital':
          endpoint = `/patients/by-hospital?hospital=${encodeURIComponent(label)}`;
          break;
        case 'patientsPerDiagnosisCategory':
          endpoint = `/patients/by-diagnosis-category?category=${encodeURIComponent(label)}`;
          break;
        case 'patientsPerStatus':
          endpoint = `/patients/by-status?status=${encodeURIComponent(label)}`;
          break;
        default:
          return;
      }

      const res = await api.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPatientsInGroup(res.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
      setPatientsInGroup([]);
    } finally {
      setPatientsLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setSelectedGroup(null);
    setPatientsInGroup([]);
  };

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Statistics
      </Typography>

      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel>Statistic Type</InputLabel>
        <Select
          value={selectedStat}
          label="Statistic Type"
          onChange={(e) => setSelectedStat(e.target.value)}
        >
          {statisticOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box display="flex" justifyContent="center" overflow="auto">
        {loading ? (
          <CircularProgress />
        ) : fetchError ? (
          <Alert severity="error">{fetchError}</Alert>
        ) : chartData.length === 0 ? (
          <Alert severity="info">No data available.</Alert>
        ) : (
          <PieChart
            series={[{
              data: chartData
            }]}
            width={600}
            height={600}
            onClick={handleSliceClick} 
            legend={{ direction: 'column', position: { vertical: 'middle', horizontal: 'right' } }}
          />
        )}
      </Box>

      <Dialog open={!!selectedGroup} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          Patients in: {selectedGroup}
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {patientsLoading ? (
            <CircularProgress />
          ) : patientsInGroup.length === 0 ? (
            <Typography>No patients found.</Typography>
          ) : (
            <List>
              {patientsInGroup.map((patient) => (
                <ListItem key={patient.id}>
                  <ListItemText primary={patient.name} />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
}
