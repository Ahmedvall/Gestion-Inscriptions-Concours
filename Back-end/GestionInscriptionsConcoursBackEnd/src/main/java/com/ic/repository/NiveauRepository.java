package com.ic.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ic.entities.evaluation.Niveau;

public interface NiveauRepository extends JpaRepository<Niveau, Long> {

}
