package com.ic.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ic.entities.Filiere;
import com.ic.repository.FiliereRepository;

@Service
public class FiliereDAO {
	
	@Autowired FiliereRepository filiereRepository;
	
	public Filiere ajoutFiliere(Filiere filiere) {
		return filiereRepository.save(filiere);
	}
	
	
	public Filiere majFiliere(Filiere filiere) {
		return filiereRepository.save(filiere);
	}
	
	public List<Filiere> filieres() {
		return filiereRepository.findAll();
	}
	
	public void supprimerFiliere(Long id) {
		filiereRepository.deleteById(id);
	}

}
