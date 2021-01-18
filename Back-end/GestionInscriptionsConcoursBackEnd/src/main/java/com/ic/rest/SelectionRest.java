package com.ic.rest;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ic.dao.SelectionDAO;
import com.ic.entities.Candidat;
import com.ic.entities.Diplome;
import com.ic.entities.Diplome_Specialite;
import com.ic.entities.Specialite;
import com.ic.models.Filter;
import com.ic.repository.CandidatRepository;
import com.ic.repository.DiplomeRepository;
import com.ic.repository.DiplomeSpecialiteRepository;
import com.ic.repository.ObtenuRepository;
import com.ic.repository.SpecialiteRepository;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/selection")
public class SelectionRest {
	
	@Autowired DiplomeRepository diplomeRepository;
	@Autowired SpecialiteRepository specialiteRepository;
	@Autowired DiplomeSpecialiteRepository diplomeSpecialiteRepository;
	@Autowired CandidatRepository candidatRepository;
	@Autowired ObtenuRepository obtenuRepository;
	
	@Autowired SelectionDAO selectionDAO;
	
	
	@GetMapping("/diplomes")
	public List<Diplome> getDiplomes() {
		List<Diplome> ldiplomes = diplomeRepository.findAll();
		List<Specialite> lspecialites = specialiteRepository.findAll();
		List<Specialite> lds = new ArrayList<Specialite>();
		
		for (Diplome diplome : ldiplomes) {
			lds = new ArrayList<Specialite>();
			for (Specialite specialite : lspecialites) {
				List<Diplome_Specialite> ds = diplomeSpecialiteRepository.findByDiplomeAndSpecialite(diplome, specialite);
				if(ds.size() > 0)
					lds.add(ds.get(0).getSpecialite());
			}
			
			diplome.setSpecialites(lds);
			
		}
		
		return ldiplomes;
	}
	
	
	@GetMapping("/mentions")
	public List<String> getMentions() {	
		return obtenuRepository.getMentions();
	}
	
	@PostMapping("/candidats/{idFiliere}/{priorite}")
	public List<Candidat> getCandidats(@RequestBody List<Filter> filters, @PathVariable Long idFiliere, @PathVariable int priorite) {	
		return selectionDAO.selection(filters,idFiliere, priorite);
	}
	
	

}
