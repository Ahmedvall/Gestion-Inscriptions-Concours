package com.ic.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ic.entities.Etablissement;
import com.ic.repository.EtablissementRepository;

@Service
public class EtablissementDAO {
	
	@Autowired EtablissementRepository etablissementRepository;
	
	public Etablissement ajout(Etablissement etablissement) {
		return etablissementRepository.save(etablissement);
	}
	
	
	public Etablissement maj(Etablissement etablissement) {
		return etablissementRepository.save(etablissement);
	}
	
	public List<Etablissement> etablissements() {
		return etablissementRepository.findAll();
	}
	
	public void supprimer(Long id) {
		etablissementRepository.deleteById(id);
	}

}
