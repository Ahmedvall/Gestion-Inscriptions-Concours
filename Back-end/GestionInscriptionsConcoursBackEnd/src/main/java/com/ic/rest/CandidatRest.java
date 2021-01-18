package com.ic.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ic.entities.Candidat;
import com.ic.repository.CandidatRepository;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/candidat")
public class CandidatRest {
	
	@Autowired CandidatRepository candidatRepository;
	
	@GetMapping("/tous")
	public List<Candidat> getCandidats() {
		return candidatRepository.findAll();
	}
	
	@GetMapping("/cin/{cin}")
	public Candidat getCandidatByCIN(@PathVariable String cin) {
		return candidatRepository.findByCin(cin).get();
	}

}
