package com.dev.clinic_registry.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;


@Entity
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime noteDate;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    @JsonBackReference
    private User author;

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id")
    @JsonBackReference
    private Patient patient;

    public Note() {}

    public Note(LocalDateTime noteDate, User author , String content, Patient patient) {
        this.noteDate = noteDate;
        this.author = author;
        this.content = content;
        this.patient = patient;
    }

    // getters e setters

    public Long getId() { return id; }
    public LocalDateTime getNoteDate() { return noteDate; }
    public void setNoteDate(LocalDateTime noteDate) { this.noteDate = noteDate; }
    @JsonBackReference
    public User getAuthor() { return author; }
    public void setAuthor(User author) { this.author = author; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    @JsonBackReference
    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }
}
