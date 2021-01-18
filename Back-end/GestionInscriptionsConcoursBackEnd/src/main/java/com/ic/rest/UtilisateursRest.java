package com.ic.rest;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ic.entities.ChefFiliere;
import com.ic.entities.Enseignant;
import com.ic.entities.Role;
import com.ic.repository.ChefFiliereRepository;
import com.ic.repository.EnseignantRepository;
import com.ic.repository.RoleRepository;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/utilisateurs")
public class UtilisateursRest {
	
	@Autowired EnseignantRepository enseignantRepository;
	@Autowired ChefFiliereRepository chefFiliereRepository;
	@Autowired RoleRepository roleRepository;
	
	
	@GetMapping("/enseignants")
	public List<Enseignant> getEnseignats() {
		return enseignantRepository.findAll();
	}
	
	@PostMapping("/enseignants/ajout")
	public Enseignant ajoutEnseignat(@RequestBody Enseignant e) {
		
		Optional<Role> roleData = roleRepository.findByNomRole("ENSEIGNANT");
		Role role = roleData.get();
		if(!roleData.isPresent()) {
			role = roleRepository.save(new Role("ENSEIGNANT"));
		}
		e.setRole(role);
		return enseignantRepository.save(e);
	}
	
	@GetMapping("/responsables")
	public List<ChefFiliere> getResponsables() {
		return chefFiliereRepository.findAll();
	}
	
	@PostMapping("/responsables/ajout")
	public ChefFiliere ajoutResponsable(@RequestBody ChefFiliere r) {
		Optional<Role> roleData = roleRepository.findByNomRole("ADMIN");
		Role role = roleData.get();
		if(!roleData.isPresent()) {
			role = roleRepository.save(new Role("ADMIN"));
		}
		r.setRole(role);
		return chefFiliereRepository.save(r);
	}

}
