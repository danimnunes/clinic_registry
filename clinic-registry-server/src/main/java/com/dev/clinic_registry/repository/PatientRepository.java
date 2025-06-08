package com.dev.clinic_registry.repository;

import com.dev.clinic_registry.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

    List<Patient> findByActiveTrue();

    @Query("SELECT p FROM Patient p " +
       "WHERE (LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%')) OR :name IS NULL) " +
       "AND (LOWER(p.diagnosis) LIKE LOWER(CONCAT('%', :diagnosis, '%')) OR :diagnosis IS NULL) " +
       "AND (LOWER(p.hospital) LIKE LOWER(CONCAT('%', :hospital, '%')) OR :hospital IS NULL) " +
       "AND (:active IS NULL OR p.active = :active)")

    List<Patient> findByFilters(
            @Param("name") String name,
            @Param("diagnosis") String diagnosis,
            @Param("hospital") String hospital,
            @Param("active") Boolean active
    );
}


