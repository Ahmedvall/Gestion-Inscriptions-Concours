package com.ic.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ic.entities.Enseignant;

public interface EnseignantRepository extends JpaRepository<Enseignant, Long> {

}
