package com.dev.clinic_registry.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private LocalDate birthDate;
    private String diagnosis;
    private String hospital;
    private boolean active;

    public Patient() {}

    public Patient(String name, LocalDate birthDate, String diagnosis, String hospital, boolean active) {
        this.name = name;
        this.birthDate = birthDate;
        this.diagnosis = diagnosis;
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
    public String getHospital() { return hospital; }
    public void setHospital(String hospital) { this.hospital = hospital; }
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
}
