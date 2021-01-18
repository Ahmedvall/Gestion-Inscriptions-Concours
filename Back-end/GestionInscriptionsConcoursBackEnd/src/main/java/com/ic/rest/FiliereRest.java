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

import com.ic.dao.FiliereDAO;
import com.ic.entities.Filiere;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/filiere")
public class FiliereRest {
	
	@Autowired FiliereDAO filiereDAO;
	
	@PostMapping("/ajout")
	public Filiere ajout(@RequestBody Filiere filiere) {
		return filiereDAO.ajoutFiliere(filiere);
	}
	
	
	@PutMapping("/maj")
	public Filiere maj(@RequestBody Filiere filiere) {
		return filiereDAO.majFiliere(filiere);
	}
	
	@GetMapping("/tous") 
	public List<Filiere> filieres() {
		return filiereDAO.filieres();
	}
	
	@DeleteMapping("/supp/{id}")
	public void supprimer(@PathVariable Long id) {
		filiereDAO.supprimerFiliere(id);
	}
	

}
