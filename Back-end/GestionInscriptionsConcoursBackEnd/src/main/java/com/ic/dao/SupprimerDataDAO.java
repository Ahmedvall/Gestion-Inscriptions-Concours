package com.ic.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ic.repository.Annee_EtudRepository;
import com.ic.repository.CandidatRepository;
import com.ic.repository.DiplomeRepository;
import com.ic.repository.DiplomeSpecialiteRepository;
import com.ic.repository.EtablissementRepository;
import com.ic.repository.FiliereRepository;
import com.ic.repository.ObtenuRepository;
import com.ic.repository.PostulerRepository;
import com.ic.repository.SpecialiteRepository;
import com.ic.repository.VilleRepository;

@Service
public class SupprimerDataDAO {
	
	@Autowired CandidatRepository candidatRepository;
	@Autowired EtablissementRepository etablissementRepository;
	@Autowired VilleRepository villeRepository;
	@Autowired SpecialiteRepository specialiteRepository;
	@Autowired FiliereRepository filiereRepository;
	@Autowired DiplomeRepository diplomeRepository;
	@Autowired Annee_EtudRepository annee_EtudRepository;
	@Autowired ObtenuRepository obtenuRepository;
	@Autowired PostulerRepository postulerRepository;
	@Autowired DiplomeSpecialiteRepository diplomeSpecialiteRepository;
	
	
	public void supprimerContenueBDD( ) {
		
		annee_EtudRepository.deleteAll();
		obtenuRepository.deleteAll();
		etablissementRepository.deleteAll();
		villeRepository.deleteAll();
		diplomeSpecialiteRepository.deleteAll();
		specialiteRepository.deleteAll();
		diplomeRepository.deleteAll();
		postulerRepository.deleteAll();
		candidatRepository.deleteAll();
		filiereRepository.deleteAll();
		
	}

}
