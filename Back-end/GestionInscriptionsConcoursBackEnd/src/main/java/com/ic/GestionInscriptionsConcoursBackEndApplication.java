package com.ic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.ic.dao.SupprimerDataDAO;

@SpringBootApplication
public class GestionInscriptionsConcoursBackEndApplication {
	@Autowired SupprimerDataDAO dao;
	
	public static void main(String[] args) {
		SpringApplication.run(GestionInscriptionsConcoursBackEndApplication.class, args);
	}

	
	
//	@Bean
//	CommandLineRunner start(ChefFiliereRepository chefFiliereRepository, RoleRepository roleRepository) {
//		return args -> {
//			//dao.supprimerContenueBDD(); 
//			Role roleAdmin = new Role("ADMIN");
//			Role roleEnseignant = new Role("ENSEIGNANT");
//			roleAdmin = roleRepository.save(roleAdmin); 
//			roleEnseignant = roleRepository.save(roleEnseignant);
//			ChefFiliere chef = new ChefFiliere("admin", "admin", null, null, "admin@admin", "admin");
//			chef.setRole(roleAdmin);
//			chefFiliereRepository.save(chef);
//		};
//	}

}
