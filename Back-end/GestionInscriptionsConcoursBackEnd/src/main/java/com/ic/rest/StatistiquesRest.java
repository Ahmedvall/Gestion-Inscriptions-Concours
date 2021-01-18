package com.ic.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ic.repository.CandidatRepository;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/statistique")
public class StatistiquesRest {
	
	@Autowired CandidatRepository candidatRepository;
	
	@GetMapping("/candidatParRegions")
	public List<Object> getCandidatsParRegions() {
		return candidatRepository.getStatistiqueParRegion();
	}
	
	@GetMapping("/candidatParEtablissement")
	public List<Object> getCandidatParEtablissement() {
		return candidatRepository.getStatistiqueParEtablissement();
	}
	
	
	@GetMapping("/filierePriorite/{priorite}")
	public List<Object> getStatistiqueParFilieresPriorite(@PathVariable int priorite) {
		return candidatRepository.getStatistiqueParFilieresPriorite(priorite);
	}

}
