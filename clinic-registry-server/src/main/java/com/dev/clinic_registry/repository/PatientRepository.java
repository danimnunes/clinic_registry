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
       "AND (LOWER(p.diagnosis_category) LIKE LOWER(CONCAT('%', :diagnosis_category, '%')) OR :diagnosis_category IS NULL) " +
       "AND (LOWER(p.hospital) LIKE LOWER(CONCAT('%', :hospital, '%')) OR :hospital IS NULL) " +
       "AND (:active IS NULL OR p.active = :active)")

    List<Patient> findByFilters(
            @Param("name") String name,
            @Param("diagnosis") String diagnosis,
            @Param("diagnosis_category") String diagnosis_category,
            @Param("hospital") String hospital,
            @Param("active") Boolean active
    );

    @Query("SELECT p.hospital, COUNT(p) FROM Patient p GROUP BY p.hospital")
    List<Object[]> countByHospital();

    @Query("SELECT p.diagnosis_category, COUNT(p) FROM Patient p GROUP BY p.diagnosis_category")
    List<Object[]> countByDiagnosisCategory();

    @Query("SELECT p.active, COUNT(p) FROM Patient p GROUP BY p.active")
    List<Object[]> countByActive();

    @Query("SELECT p FROM Patient p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Patient> findByHospital(String hospital);

    @Query("SELECT p FROM Patient p WHERE p.diagnosis_category = :diagnosis_category")
    List<Patient> findByDiagnosisCategory(@Param("diagnosis_category") String diagnosis_category);

    @Query("SELECT p FROM Patient p WHERE p.active = :status")
    List<Patient> findByActive(String status);

}


