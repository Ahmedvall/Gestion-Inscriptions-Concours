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

import com.ic.entities.evaluation.Niveau;
import com.ic.repository.NiveauRepository;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/niveau")
public class NiveauRest {
	
	@Autowired NiveauRepository niveauRepository;
	
	@PostMapping("/ajout")
	public Niveau ajout(@RequestBody Niveau niveau) {
		return niveauRepository.save(niveau);
	}
	
	
	@PutMapping("/maj")
	public Niveau maj(@RequestBody Niveau niveau) {
		return niveauRepository.save(niveau);
	}
	
	@GetMapping("/tous") 
	public List<Niveau> niveaux() {
		return niveauRepository.findAll();
	}
	
	@DeleteMapping("/supp/{id}")
	public void supprimer(@PathVariable Long id) {
		niveauRepository.deleteById(id);
	}

}
