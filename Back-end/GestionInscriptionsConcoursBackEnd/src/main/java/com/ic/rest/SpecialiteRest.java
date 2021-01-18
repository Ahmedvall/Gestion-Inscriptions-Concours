package com.ic.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ic.dao.SpecialiteDAO;
import com.ic.entities.Specialite;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/specialite")
public class SpecialiteRest {
	
	@Autowired SpecialiteDAO specialiteDAO;
	
	@PostMapping("/ajout")
	public Specialite ajout(@RequestBody Specialite specialite) {
		return specialiteDAO.ajout(specialite);
	}
	
	
	@PutMapping("/maj")
	public Specialite maj(@RequestBody Specialite specialite) {
		return specialiteDAO.maj(specialite);
	}
	
	
	@GetMapping("/tous") 
	public List<Specialite> filieres() {
		return specialiteDAO.specialites();
	}
	
	@DeleteMapping("/supp/{id}")
	public void supprimer(@PathVariable Long id) {
		specialiteDAO.supprimer(id);
	}

}
