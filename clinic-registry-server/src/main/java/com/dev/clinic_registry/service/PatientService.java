package com.dev.clinic_registry.service;


import com.dev.clinic_registry.dto.PatientWindowDTO;
import com.dev.clinic_registry.dto.StatisticResponse;
import com.dev.clinic_registry.model.Patient;
import com.dev.clinic_registry.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public List<Patient> getPatientsFiltered(String name, String diagnosis, String diagnosis_category, String hospital, Boolean active) {
        name = (name == null || name.trim().isEmpty()) ? null : "%" + name.trim() + "%";
        diagnosis = (diagnosis == null || diagnosis.trim().isEmpty()) ? null : "%" + diagnosis.trim() + "%";
        diagnosis_category = (diagnosis_category == null || diagnosis_category.trim().isEmpty()) ? null : "%" + diagnosis_category.trim() + "%";
        hospital = (hospital == null || hospital.trim().isEmpty()) ? null : "%" + hospital.trim() + "%";
        return patientRepository.findByFilters(name, diagnosis, diagnosis_category, hospital, active);
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
            patient.setdiagnosis_category(updatedPatient.getdiagnosis_category());
            patient.setHospital(updatedPatient.getHospital());
            patient.setActive(updatedPatient.isActive());
            return patientRepository.save(patient);
        }).orElseThrow(() -> new RuntimeException("Patient not found"));
    }

    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }

    public List<String> getAllDiagnosisCategories() {
        return patientRepository.findAll().stream()
                .map(Patient::getdiagnosis_category)
                .distinct()
                .toList();
    }

    public List<StatisticResponse> getPatientsPerHospital() {
        return patientRepository.countByHospital()
            .stream()
            .map(obj -> new StatisticResponse((String) obj[0], ((Long) obj[1]).intValue()))
            .collect(Collectors.toList());
    }

    public List<StatisticResponse> getPatientsPerDiagnosisCategory() {
        return patientRepository.countByDiagnosisCategory()
            .stream()
            .map(obj -> new StatisticResponse((String) obj[0], ((Long) obj[1]).intValue()))
            .collect(Collectors.toList());
    }

    public List<StatisticResponse> getPatientsPerStatus() {
        return patientRepository.countByActive()
            .stream()
            .map(obj -> new StatisticResponse(
                (Boolean) obj[0] ? "Active" : "Inactive",
                ((Long) obj[1]).intValue()))
            .collect(Collectors.toList());
    }

    public List<PatientWindowDTO> getPatientsByHospital(String hospital) {
        return patientRepository.findByHospital(hospital)
                .stream()
                .map(PatientWindowDTO::fromEntity)
                .toList();
    }
    
    public List<PatientWindowDTO> getPatientsByDiagnosisCategory(String diagnosis_category) {
        return patientRepository.findByDiagnosisCategory(diagnosis_category)
                .stream()
                .map(PatientWindowDTO::fromEntity)
                .toList();
    }
    
    public List<PatientWindowDTO> getPatientsByStatus(String status) {
        return patientRepository.findByActive(status)
                .stream()
                .map(PatientWindowDTO::fromEntity)
                .toList();
    }
    
}

