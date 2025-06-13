package com.dev.clinic_registry.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;


@Entity
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private LocalDate birthDate;
    private String diagnosis;
    @Column(name = "diagnosis_category")
    private String diagnosis_category;
    private String hospital;
    private boolean active;

    @JsonManagedReference
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<HealthRecord> clinicalHistory;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Note> notes;

    public Patient() {}

    public Patient(String name, LocalDate birthDate, String diagnosis, String diagnosis_category, String hospital, boolean active) {
        this.name = name;
        this.birthDate = birthDate;
        this.diagnosis = diagnosis;
        this.diagnosis_category = diagnosis_category;
        this.hospital = hospital;
        this.active = active;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public LocalDate getBirthDate() { return birthDate; }
    public void setBirthDate(LocalDate birthDate) { this.birthDate = birthDate; }
    public String getDiagnosis() { return diagnosis; }
    public void setDiagnosis(String diagnosis) { this.diagnosis = diagnosis; }
    public String getdiagnosis_category() { return diagnosis_category; }
    public void setdiagnosis_category(String diagnosis_category) { this.diagnosis_category = diagnosis_category; }
    public String getHospital() { return hospital; }
    public void setHospital(String hospital) { this.hospital = hospital; }
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
    @JsonManagedReference
    public List<HealthRecord> getClinicalHistory() { return clinicalHistory; }
    public void setClinicalHistory(List<HealthRecord> clinicalHistory) { this.clinicalHistory = clinicalHistory; }
    @JsonManagedReference
    public List<Note> getNotes() { return notes; }
    public void setNotes(List<Note> notes) { this.notes = notes; }
}
