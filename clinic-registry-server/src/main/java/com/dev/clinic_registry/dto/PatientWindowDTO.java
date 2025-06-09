package com.dev.clinic_registry.dto;

import com.dev.clinic_registry.model.Patient;

public class PatientWindowDTO {
    private Long id;
    private String name;

    public PatientWindowDTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public static PatientWindowDTO fromEntity(Patient patient) {
        return new PatientWindowDTO(patient.getId(), patient.getName());
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;    
    }
    public void setName(String name) {
        this.name = name;
    }
}
