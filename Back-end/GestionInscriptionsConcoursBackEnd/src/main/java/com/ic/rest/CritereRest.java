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

import com.ic.entities.evaluation.Critere;
import com.ic.repository.CritereRepository;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/critere")
public class CritereRest {
	
	@Autowired CritereRepository critereRepository;
	
	@PostMapping("/ajout")
	public Critere ajout(@RequestBody Critere critere) {
		return critereRepository.save(critere);
	}
	
	
	@PutMapping("/maj")
	public Critere maj(@RequestBody Critere critere) {
		return critereRepository.save(critere);
	}
	
	@GetMapping("/tous") 
	public List<Critere> criteres() {
		return critereRepository.findAll();
	}
	
	@DeleteMapping("/supp/{id}")
	public void supprimer(@PathVariable Long id) {
		critereRepository.deleteById(id);
	}

}
