package com.ic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ic.entities.Diplome;
import com.ic.entities.Diplome_Specialite;
import com.ic.entities.Specialite;

public interface DiplomeSpecialiteRepository extends JpaRepository<Diplome_Specialite, Long> {
	
	List<Diplome_Specialite> findByDiplomeAndSpecialite(Diplome diplome, Specialite specialite);
	

}
