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

import com.ic.entities.evaluation.Matiere;
import com.ic.repository.MatiereRepository;


@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/matiere")
public class MatiereRest {

	@Autowired MatiereRepository matiereRepository;
	
	@PostMapping("/ajout")
	public Matiere ajout(@RequestBody Matiere matiere) {
		return matiereRepository.save(matiere);
	}
	
	
	@PutMapping("/maj")
	public Matiere maj(@RequestBody Matiere matiere) {
		return matiereRepository.save(matiere);
	}
	
	@GetMapping("/tous") 
	public List<Matiere> matieres() {
		return matiereRepository.findAll();
	}
	
	@DeleteMapping("/supp/{id}")
	public void supprimer(@PathVariable Long id) {
		matiereRepository.deleteById(id);
	}
	
}
