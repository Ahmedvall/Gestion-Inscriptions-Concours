package com.ic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ic.entities.Etablissement;

public interface EtablissementRepository extends JpaRepository<Etablissement, Long>{
	
	List<Etablissement> findByNom(String nom);
	

}
