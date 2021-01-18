package com.ic.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ic.entities.Filiere;

public interface FiliereRepository extends JpaRepository<Filiere, Long> {

	Optional<Filiere> findByNom(String nom);
	
}
