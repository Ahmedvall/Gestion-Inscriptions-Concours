package com.ic.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ic.entities.Annee_Etudes;
import com.ic.entities.Candidat;
import com.ic.entities.Diplome;
import com.ic.entities.Filiere;
import com.ic.entities.Obtenu;
import com.ic.entities.Specialite;
import com.ic.models.Filter;
import com.ic.repository.CandidatRepository;
import com.ic.repository.DiplomeRepository;
import com.ic.repository.FiliereRepository;
import com.ic.repository.ObtenuRepository;
import com.ic.repository.SpecialiteRepository;

@Service
public class SelectionDAO {
	
	@Autowired ObtenuRepository obtenuRepository;
	@Autowired DiplomeRepository diplomeRepository;
	@Autowired SpecialiteRepository specialiteRepository;
	@Autowired CandidatRepository candidatRepository;
	@Autowired FiliereRepository filiereRepository;
	
	public List<Candidat> selection(List<Filter> filters, Long idFiliere, int priorite) {

		if(filters.size() > 0) {
			
			List<Candidat> listCandidats = new ArrayList<Candidat>();
			String diplome, specialite, filiere;
			if(filters.get(0).mention == null) {
				filters.get(0).mention="%";
			}
			
			if(filters.get(0).idDiplome == null) {
				diplome = "%";
			}else {
				Diplome d = diplomeRepository.findById(filters.get(0).idDiplome).get();
				diplome = d.getType();
			}
			
			if(filters.get(0).idSpecialite == null) {
				
				specialite = "%";
			} else {
				Specialite s = specialiteRepository.findById(filters.get(0).idSpecialite).get();
				specialite = s.getNom();
			}
			
			if(idFiliere == -1) {
				
				filiere = "%";
			} else {
				Filiere f = filiereRepository.findById(idFiliere).get();
				filiere = f.getNom();
			}
 
			
			System.out.println(filters.get(0).mention+" -- " + diplome +" -- " + specialite);
			List<Candidat> candidats = obtenuRepository.selection(filters.get(0).mention, diplome, specialite, filiere, priorite, filters.get(0).moyenne);
			Boolean mentionBool = false, diplomeBool = false, specBool = false, moyBool = false;
			
			if(filters.size() > 1 && candidats.size() > 0) {
				for (int i = 1; i < filters.size(); i++) {
					listCandidats = new ArrayList<Candidat>();
					System.out.println("filter --> : idSpec: "+ filters.get(i).idSpecialite + ", idDip: "+filters.get(i).idDiplome );
					for (Candidat candidat : candidats) {
						for (Obtenu obtenu : candidat.getObtenues()) {
							if(filters.get(i).mention != null) {
								if(obtenu.getMention().equals(filters.get(i).mention)) {
									mentionBool = true;
								}
							}else {
								mentionBool = true;
							}
							
							if(filters.get(i).idDiplome != null) {
								//System.out.println(obtenu.getDiplome_specialite().getDiplome().getIdDiplome()+ "," + filters.get(i).idDiplome);
								if(obtenu.getDiplome_specialite().getDiplome().getIdDiplome().equals(filters.get(i).idDiplome)) {
									diplomeBool = true;
								}
							}else {
								diplomeBool = true;
							}
							
							if(filters.get(i).idSpecialite != null) {
								if(obtenu.getDiplome_specialite().getSpecialite().getIdSpec().equals(filters.get(i).idSpecialite)) {
									specBool = true;
								}
							}else {
								specBool = true;
							}
							
							
							for (Annee_Etudes an : obtenu.getAnneesEtudes()) {
								if(filters.get(i).moyenne > 0) {
									if(an.getMoyGeneral() >= filters.get(i).moyenne) {
										moyBool = true;
									}
								}else {
									moyBool = true;
								}
							}
							
							
							
							if(moyBool == true && mentionBool == true && diplomeBool == true && specBool == true) {
								listCandidats.add(candidat);
								//System.out.println("yes -> Diplome: "+ diplomeBool +", Spec: "+specBool +", Mention: "+mentionBool);
								break;
							}	
							else {
								//System.out.println("no -> Diplome: "+ diplomeBool +", Spec: "+specBool +", Mention: "+mentionBool);
								moyBool = false; mentionBool = false; diplomeBool = false; specBool = false;
							}
						}
						
						moyBool = false; mentionBool = false; diplomeBool = false; specBool = false;
						
					}
					
					candidats = listCandidats;
					if(candidats.size() <= 0) break;
				}
				
			}
			
			return candidats;
			
		}else if(idFiliere != -1){
			
			Filiere f = filiereRepository.findById(idFiliere).get();
			String filiere = f.getNom();
			List<Candidat> candidats = obtenuRepository.selection("%", "%", "%", filiere, priorite, 0);
			return candidats;
			
			} else {
				return candidatRepository.findAll();
			}
			
		}
		

}
