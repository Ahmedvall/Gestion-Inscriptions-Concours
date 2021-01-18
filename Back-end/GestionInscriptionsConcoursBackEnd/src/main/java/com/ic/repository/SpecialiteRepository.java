package com.ic.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ic.entities.Specialite;

public interface SpecialiteRepository extends JpaRepository<Specialite, Long> {
	
	Optional<Specialite> findByNom(String nom);
	

}
