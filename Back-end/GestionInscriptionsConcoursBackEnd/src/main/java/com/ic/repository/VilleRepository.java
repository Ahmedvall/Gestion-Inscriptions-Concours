package com.ic.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ic.entities.Ville;

public interface VilleRepository extends JpaRepository<Ville, Long> {
	
	Optional<Ville> findByNomAllIgnoreCase(String nom);
	

}
