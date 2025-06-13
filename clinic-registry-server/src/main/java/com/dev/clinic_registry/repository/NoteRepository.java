package com.dev.clinic_registry.repository;


import com.dev.clinic_registry.model.Note;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {

    @Query("SELECT n FROM Note n JOIN FETCH n.author WHERE n.patient.id = :patientId")
    List<Note> findByPatientIdWithAuthor(@Param("patientId") Long patientId);

    
}



