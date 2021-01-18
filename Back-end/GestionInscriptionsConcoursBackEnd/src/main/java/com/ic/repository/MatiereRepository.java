package com.ic.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ic.entities.evaluation.Matiere;

public interface MatiereRepository extends JpaRepository<Matiere, Long> {

}
