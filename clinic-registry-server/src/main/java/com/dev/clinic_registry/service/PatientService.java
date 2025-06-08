package com.dev.clinic_registry.service;


import com.dev.clinic_registry.model.Patient;
import com.dev.clinic_registry.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    private final PatientRepository patientRepository;

    @Autowired
    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public List<Patient> getAllActivePatients() {
        return patientRepository.findByActiveTrue();
    }

    public List<Patient> getPatientsFiltered(String name, String diagnosis, String hospital, Boolean active) {
        name = (name == null || name.trim().isEmpty()) ? null : "%" + name.trim() + "%";
        diagnosis = (diagnosis == null || diagnosis.trim().isEmpty()) ? null : "%" + diagnosis.trim() + "%";
        hospital = (hospital == null || hospital.trim().isEmpty()) ? null : "%" + hospital.trim() + "%";
        return patientRepository.findByFilters(name, diagnosis, hospital, active);
    }
       
    

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Optional<Patient> getPatientById(Long id) {
        return patientRepository.findById(id);
    }

    public Patient createPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    public Patient updatePatient(Long id, Patient updatedPatient) {
        return patientRepository.findById(id).map(patient -> {
            patient.setName(updatedPatient.getName());
            patient.setBirthDate(updatedPatient.getBirthDate());
            patient.setDiagnosis(updatedPatient.getDiagnosis());
            patient.setHospital(updatedPatient.getHospital());
            patient.setActive(updatedPatient.isActive());
            return patientRepository.save(patient);
        }).orElseThrow(() -> new RuntimeException("Patient not found"));
    }

    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }
}

