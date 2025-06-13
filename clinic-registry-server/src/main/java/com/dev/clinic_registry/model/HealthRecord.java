package com.dev.clinic_registry.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;


@Entity
public class HealthRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime recordDate;

    private String recordType;

    private String description;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id")
    private Patient patient;

    public HealthRecord() {}

    public HealthRecord(LocalDateTime recordDate, String recordType, String description, Patient patient) {
        this.recordDate = recordDate;
        this.recordType = recordType;
        this.description = description;
        this.patient = patient;
    }

    // getters e setters

    public Long getId() { return id; }
    public LocalDateTime getRecordDate() { return recordDate; }
    public void setRecordDate(LocalDateTime recordDate) { this.recordDate = recordDate; }
    public String getRecordType() { return recordType; }
    public void setRecordType(String recordType) { this.recordType = recordType; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    @JsonBackReference
    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }
}

