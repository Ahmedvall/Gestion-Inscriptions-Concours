package com.ic.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ic.entities.Diplome;

public interface DiplomeRepository extends JpaRepository<Diplome, Long> {
	
	Optional<Diplome> findByType(String type);
	

}
