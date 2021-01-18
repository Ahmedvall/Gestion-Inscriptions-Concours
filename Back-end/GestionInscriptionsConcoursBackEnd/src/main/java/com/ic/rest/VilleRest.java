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

import com.ic.dao.VilleDAO;
import com.ic.entities.Ville;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/ville")
public class VilleRest {
	
	@Autowired VilleDAO villeDAO;
	
	@PostMapping("/ajout")
	public Ville ajout(@RequestBody Ville ville) {
		return villeDAO.ajout(ville);
	}
	
	@PutMapping("/maj")
	public Ville maj(@RequestBody Ville ville) {
		return villeDAO.maj(ville);
	}
	
	
	@GetMapping("/tous") 
	public List<Ville> villes() {
		return villeDAO.villes();
	}
	
	@DeleteMapping("/supp/{id}")
	public void supprimer(@PathVariable Long id) {
		villeDAO.supprimer(id);
	}

}
