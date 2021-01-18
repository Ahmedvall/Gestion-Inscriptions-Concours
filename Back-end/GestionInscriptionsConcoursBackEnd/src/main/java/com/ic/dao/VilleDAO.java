package com.ic.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ic.entities.Ville;
import com.ic.repository.VilleRepository;

@Service
public class VilleDAO {
	
	@Autowired VilleRepository villeRepository;
	
	public Ville ajout(Ville ville) {
		return villeRepository.save(ville);
	}
	
	
	public Ville maj(Ville ville) {
		return villeRepository.save(ville);
	}
	
	public List<Ville> villes() {
		return villeRepository.findAll();
	}
	
	public void supprimer(Long id) {
		villeRepository.deleteById(id);
	}

}
