import React, { useEffect, useState, useCallback } from 'react';
import api from '../api/api';
import LogoutButton from '../components/LogoutButton';
import { Button } from '@mui/material';
import RequireRole from '../components/RequireRole';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Alert,
  CircularProgress,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';

export default function Dashboard() {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  const [filterName, setFilterName] = useState('');
  const [filterDiagnosis, setFilterDiagnosis] = useState('');

  const [filterCategory, setFilterCategory] = useState('');
  const [diagnosisCategories, setDiagnosisCategories] = useState([]);

  const [filterHospital, setFilterHospital] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const fetchPatients = useCallback(async () => {
    setLoading(true);
    setFetchError('');
    const token = localStorage.getItem('token');

    const params = new URLSearchParams();

    if (filterName.trim() !== '') params.append('name', filterName.trim());
    if (filterDiagnosis.trim() !== '') params.append('diagnosis', filterDiagnosis.trim());
    if (filterCategory.trim() !== '') params.append('diagnosis_category', filterCategory.trim());
    if (filterHospital.trim() !== '') params.append('hospital', filterHospital.trim());
    if (filterStatus === 'active') params.append('status', 'active');
    else if (filterStatus === 'inactive') params.append('status', 'inactive');

    try {
      const response = await api.get(`/patients?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
      setFetchError('Failed to load patients.');
    } finally {
      setLoading(false);
    }
  }, [filterName, filterDiagnosis, filterCategory, filterHospital, filterStatus]);

  const clearFilters = () => {
    setFilterName('');
    setFilterDiagnosis('');
    setFilterCategory('');
    setFilterHospital('');
    setFilterStatus('');
  };

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/patients/diagnosis-categories', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDiagnosisCategories(response.data);
      } catch (error) {
        console.error('Failed to load diagnosis categories:', error);
      }
    };
  
    fetchCategories();
  }, []);
  

  const calculateAge = (bDate) => {
    if (!bDate) return 'N/A';
    const birthDate = new Date(bDate);
    if (isNaN(birthDate.getTime())) return 'Invalid date';
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age--;
    return age;
  };

  return (
    <RequireRole roles={['ROLE_DOCTOR', 'ROLE_ADMIN']}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4" gutterBottom>
            Clinic Dashboard
          </Typography>
          <LogoutButton />
        </Box>

        <Box mb={3}>
          <Typography variant="h6">Admin/Doctor Panel</Typography>
          <Typography variant="body1">
            Content only visible to users with roles: <strong>DOCTOR</strong> or <strong>ADMIN</strong>.
          </Typography>
        </Box>

        <Typography variant="h5" gutterBottom>
          Patient Records
        </Typography>

        {/* Filters */}
        <Box
          component={Paper}
          p={2}
          mb={3}
          display="flex"
          gap={2}
          flexWrap="wrap"
          alignItems="center"
        >
          <TextField
            label="Search by Name"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            variant="outlined"
            size="small"
          />
          <TextField
            label="Search by Diagnosis"
            value={filterDiagnosis}
            onChange={(e) => setFilterDiagnosis(e.target.value)}
            variant="outlined"
            size="small"
          />
          <TextField
            label="Search by Hospital"
            value={filterHospital}
            onChange={(e) => setFilterHospital(e.target.value)}
            variant="outlined"
            size="small"
          />
          <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Diagnosis Category</InputLabel>
            <Select
              label="Diagnosis Category"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {diagnosisCategories.map((diagnosis_category) => (
                <MenuItem key={diagnosis_category} value={diagnosis_category}>
                  {diagnosis_category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>

          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={clearFilters}
            >
              Clear All
            </Button>
          </Box>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/statistics')}
            >
              View Statistics
            </Button>
          </Box>

        </Box>

        {loading ? (
          <CircularProgress />
        ) : fetchError ? (
          <Alert severity="error">{fetchError}</Alert>
        ) : patients.length === 0 ? (
          <Alert severity="info">No patients found.</Alert>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Age</strong></TableCell>
                  <TableCell><strong>Diagnosis</strong></TableCell>
                  <TableCell><strong>Diagnosis Category</strong></TableCell>
                  <TableCell><strong>Hospital</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{calculateAge(patient.birthDate)} years</TableCell>
                    <TableCell>{patient.diagnosis}</TableCell>
                    <TableCell>{patient.diagnosis_category}</TableCell>
                    <TableCell>{patient.hospital}</TableCell>
                    <TableCell>{patient.active ? 'Active' : 'Inactive'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </RequireRole>
  );
}
