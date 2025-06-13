package com.dev.clinic_registry.dto;

import java.time.LocalDateTime;

import com.dev.clinic_registry.model.Note;

// DTO
public class NoteDTO {
    private Long id;
    private String content;
    private LocalDateTime noteDate;
    private String authorUsername;

    public NoteDTO(Note note) {
        this.id = note.getId();
        this.content = note.getContent();
        this.noteDate = note.getNoteDate();
        this.authorUsername = note.getAuthor() != null ? note.getAuthor().getUsername() : "Unknown Author";
    }


    // Getters and Setters
    public Long getId() {
            return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getNoteDate() {
        return noteDate;
    }

    public void setNoteDate(LocalDateTime noteDate) {
        this.noteDate = noteDate;
    }

    public String getAuthorUsername() {
        return authorUsername;
    }

    public void setAuthorUsername(String authorUsername) {
        this.authorUsername = authorUsername;
    }
}

