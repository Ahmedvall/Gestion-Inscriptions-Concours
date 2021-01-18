package com.ic.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ic.entities.Specialite;
import com.ic.repository.SpecialiteRepository;

@Service
public class SpecialiteDAO {
	
	@Autowired SpecialiteRepository specialiteRepository;
	
	public Specialite ajout(Specialite specialite) {
		return specialiteRepository.save(specialite);
	}
	
	
	public Specialite maj(Specialite specialite) {
		return specialiteRepository.save(specialite);
	}
	
	public List<Specialite> specialites() {
		return specialiteRepository.findAll();
	}
	
	public void supprimer(Long id) {
		specialiteRepository.deleteById(id);
	}

}
