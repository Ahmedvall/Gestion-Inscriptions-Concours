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

import com.ic.dao.EtablissementDAO;
import com.ic.entities.Etablissement;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/etablissement")
public class EtablissementRest {
	
	@Autowired EtablissementDAO etablissementDAO;
	
	@PostMapping("/ajout")
	public Etablissement ajout(@RequestBody Etablissement etablissement) {
		return etablissementDAO.ajout(etablissement);
	}
	
	
	@PutMapping("/maj")
	public Etablissement maj(@RequestBody Etablissement etablissement) {
		return etablissementDAO.maj(etablissement);
	}
	
	
	@GetMapping("/tous") 
	public List<Etablissement> etablissements() {
		return etablissementDAO.etablissements();
	}
	
	@DeleteMapping("/supp/{id}")
	public void supprimer(@PathVariable Long id) {
		etablissementDAO.supprimer(id);
	}

}
