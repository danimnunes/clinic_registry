package com.dev.clinic_registry.controller;


import com.dev.clinic_registry.dto.PatientWindowDTO;
import com.dev.clinic_registry.dto.StatisticResponse;
import com.dev.clinic_registry.model.Patient;
import com.dev.clinic_registry.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "http://localhost:3000") // Adjust the origin as needed for frontend application
public class PatientController {

    private final PatientService patientService;

    @Autowired
    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_DOCTOR')")
    public List<Patient> getAllPatients(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String diagnosis,
            @RequestParam(required = false) String diagnosis_category,
            @RequestParam(required = false) String hospital,
            @RequestParam(required = false) String status 
    ) {
        Boolean activeStatus = null;
        if ("active".equalsIgnoreCase(status)) {
            activeStatus = true;
        } else if ("inactive".equalsIgnoreCase(status)) {
            activeStatus = false;
        }
        return patientService.getPatientsFiltered(name, diagnosis, diagnosis_category, hospital, activeStatus);
    }


    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_DOCTOR')")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
        return patientService.getPatientById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Patient> createPatient(@RequestBody Patient patient) {
        Patient created = patientService.createPatient(patient);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Patient> updatePatient(@PathVariable Long id, @RequestBody Patient patient) {
        return ResponseEntity.ok(patientService.updatePatient(id, patient));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/diagnosis-categories")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_DOCTOR')")
    public ResponseEntity<List<String>> getDiagnosisCategories() {
        List<String> categories = patientService.getAllDiagnosisCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/patients-per-hospital")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_DOCTOR')")
    public ResponseEntity<List<StatisticResponse>> getPatientsPerHospital() {
        List<StatisticResponse> stats = patientService.getPatientsPerHospital();
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/patients-per-diagnosis-category")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_DOCTOR')")
    public ResponseEntity<List<StatisticResponse>> getPatientsPerDiagnosisCategory() {
        List<StatisticResponse> stats = patientService.getPatientsPerDiagnosisCategory();
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/patients-per-status")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_DOCTOR')")
    public ResponseEntity<List<StatisticResponse>> getPatientsPerStatus() {
        List<StatisticResponse> stats = patientService.getPatientsPerStatus();
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/by-hospital")
    public ResponseEntity<List<PatientWindowDTO>> getPatientsByHospital(@RequestParam String hospital) {
        List<PatientWindowDTO> patients = patientService.getPatientsByHospital(hospital);
        return ResponseEntity.ok(patients);
    }

    @GetMapping("/by-diagnosis-category")
    public ResponseEntity<List<PatientWindowDTO>> getPatientsByDiagnosisCategory(@RequestParam String diagnosis_category) {
        List<PatientWindowDTO> patients = patientService.getPatientsByDiagnosisCategory(diagnosis_category);
        return ResponseEntity.ok(patients);
    }

    @GetMapping("/by-status")
    public ResponseEntity<List<PatientWindowDTO>> getPatientsByStatus(@RequestParam String status) {
        List<PatientWindowDTO> patients = patientService.getPatientsByStatus(status);
        return ResponseEntity.ok(patients);
    }
}