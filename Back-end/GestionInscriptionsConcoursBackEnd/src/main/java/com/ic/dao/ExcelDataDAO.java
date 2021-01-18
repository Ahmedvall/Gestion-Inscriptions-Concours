package com.ic.dao;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ic.entities.Annee_Etudes;
import com.ic.entities.Candidat;
import com.ic.entities.Diplome;
import com.ic.entities.Diplome_Specialite;
import com.ic.entities.Etablissement;
import com.ic.entities.Filiere;
import com.ic.entities.Obtenu;
import com.ic.entities.Postuler;
import com.ic.entities.Specialite;
import com.ic.entities.Ville;
import com.ic.excelModel.Principal;
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
public class ExcelDataDAO {
	
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
	
	public List<Principal> exporter() {
		Principal principal = new Principal();
		List<Principal> listPrincipal = new ArrayList<Principal>();
		
		List<Candidat> candidats = candidatRepository.findAll();
		for (int i = 0; i < candidats.size(); i++) {
			principal = new Principal();
			
			principal.nom_candidat = candidats.get(i).getNom();
			principal.prenom_candidat = candidats.get(i).getPrenom();
			principal.numTel_candidat = candidats.get(i).getNumTel();
			SimpleDateFormat dateForma = new SimpleDateFormat("dd/MM/yyyy");
			principal.dateNaissance_candidat = dateForma.format(candidats.get(i).getDateNaissance());
			principal.email_candidat = candidats.get(i).getMail();
			principal.cin_candidat = candidats.get(i).getCin();
			principal.cne_candidat = candidats.get(i).getCne();
			
			// a revoir
			
			principal.etablissement = candidats.get(i).getObtenues().get(0).getEtablissement().getNom();
			principal.ville_etablissement = candidats.get(i).getObtenues().get(0).getEtablissement().getVille().getNom();
			//principal.specialite = candidats.get(i).getObtenues().get(0).getDiplome_specialite().getSpecialite().getNom();
			
			for (int j = 0; j < candidats.get(i).getObtenues().size(); j++) {
				if(candidats.get(i).getObtenues().get(j).getDiplome_specialite().getDiplome().getType().toLowerCase().contains("bac")) {
					
					principal.specialite_diplome_bac = candidats.get(i).getObtenues().get(j).getDiplome_specialite().getSpecialite().getNom();
					principal.date_diplome_bac = candidats.get(i).getObtenues().get(j).getDateObtention();
					principal.moyenne_General_bac = Double.parseDouble(""+candidats.get(i).getObtenues().get(j).getAnneesEtudes().get(0).getMoyGeneral());
					principal.mention_bac = candidats.get(i).getObtenues().get(j).getMention();
				
				} else if(candidats.get(i).getObtenues().get(j).getDiplome_specialite().getDiplome().getType().toLowerCase().contains("licence")) {
					
					principal.specialite_diplome_licence = candidats.get(i).getObtenues().get(j).getDiplome_specialite().getDiplome().getType();
					principal.date_diplome_licence = candidats.get(i).getObtenues().get(j).getDateObtention();
					principal.mention_licence = candidats.get(i).getObtenues().get(j).getMention();
					List<Annee_Etudes> notes = candidats.get(i).getObtenues().get(j).getAnneesEtudes();
					Collections.sort(notes , Comparator.comparingLong(Annee_Etudes::getIdae));
					principal.noteS1 = Double.parseDouble(""+notes.get(0).getNoteSemester1());
					principal.noteS2 = Double.parseDouble(""+notes.get(0).getNoteSemester2());
					principal.noteS3 = Double.parseDouble(""+notes.get(1).getNoteSemester1());
					principal.noteS4 = Double.parseDouble(""+notes.get(1).getNoteSemester2());
					principal.noteS5 = Double.parseDouble(""+notes.get(2).getNoteSemester1());
					principal.noteS6 = Double.parseDouble(""+notes.get(2).getNoteSemester2());
						
				} else if(candidats.get(i).getObtenues().get(j).getDiplome_specialite().getDiplome().getType().toLowerCase().contains("master")) {
					
					principal.specialite_diplome_master = candidats.get(i).getObtenues().get(j).getDiplome_specialite().getDiplome().getType();
					principal.date_diplome_master = candidats.get(i).getObtenues().get(j).getDateObtention();
					principal.mention_master = candidats.get(i).getObtenues().get(j).getMention();
					List<Annee_Etudes> notes = candidats.get(i).getObtenues().get(j).getAnneesEtudes();
					Collections.sort(notes , Comparator.comparingLong(Annee_Etudes::getIdae));
					principal.noteS7 = Double.parseDouble(""+notes.get(0).getNoteSemester1());
					principal.noteS8 = Double.parseDouble(""+notes.get(0).getNoteSemester2());
					principal.noteS9 = Double.parseDouble(""+notes.get(1).getNoteSemester1());
					principal.noteS10 = Double.parseDouble(""+notes.get(1).getNoteSemester2());
											
				}
				
				
			}
			
			
			principal.filiere1 = candidats.get(i).getListpost().get(0).getFiliere().getNom();
			principal.filiere2 = candidats.get(i).getListpost().get(1).getFiliere().getNom();
			
			listPrincipal.add(principal);
			
		}
		
		return listPrincipal;
	}
	
	
	@SuppressWarnings("unused")
	public void importer(List<Principal> lprincipal) {
		
		Obtenu obtenu;	Candidat candidat; Etablissement etablissement; Ville ville;
		Diplome diplomeBac; Diplome diplomeLicence; Diplome diplomeMaster;
		Specialite specialite; Filiere filiere1; Filiere filiere2; 
		Postuler postuler; Annee_Etudes annee_EtudeBAC; 
		List<Annee_Etudes> annee_Etudes; Diplome_Specialite diplome_SpecialiteBac;
		Diplome_Specialite diplome_SpecialiteLicence; Diplome_Specialite diplome_SpecialiteMaster;
		
		for (int i = 0; i < lprincipal.size(); i++) {
			System.out.println("\n sauv ..........");
			obtenu = new Obtenu();	candidat = new Candidat();	etablissement = new Etablissement();
			ville = new Ville(); filiere1 = new Filiere(); filiere2 = new Filiere();
			diplomeBac = new Diplome(); diplomeLicence = new Diplome(); diplomeMaster = new Diplome();
			annee_EtudeBAC = new Annee_Etudes(); postuler = new Postuler();
			specialite = new Specialite(); annee_Etudes = new ArrayList<Annee_Etudes>();
			diplome_SpecialiteBac = new Diplome_Specialite(); diplome_SpecialiteLicence = new Diplome_Specialite();
			diplome_SpecialiteMaster = new Diplome_Specialite();
			
			
			candidat = getCandidat(lprincipal.get(i));
			ville = getVille(lprincipal.get(i));
			etablissement = getEtablissement(lprincipal.get(i), ville);
			
			if(!lprincipal.get(i).specialite_diplome_bac.isEmpty()) {
				specialite = new Specialite();
				diplomeBac = getDiplome(lprincipal.get(i), "bac");
				specialite = getSpecialite(lprincipal.get(i).specialite_diplome_bac);
				diplome_SpecialiteBac = enregistrerDiplomeEtSpecialite(diplomeBac, specialite);
			}
			if(!lprincipal.get(i).specialite_diplome_licence.isEmpty()) {
				specialite = new Specialite();
				diplomeLicence = getDiplome(lprincipal.get(i), "licence");
				specialite = getSpecialite(lprincipal.get(i).specialite_diplome_licence);
				diplome_SpecialiteLicence = enregistrerDiplomeEtSpecialite(diplomeLicence, specialite);
			}
				
			if(!lprincipal.get(i).specialite_diplome_master.isEmpty()) {
				specialite = new Specialite();
				diplomeMaster = getDiplome(lprincipal.get(i), "master");
				specialite = getSpecialite(lprincipal.get(i).specialite_diplome_master);
				diplome_SpecialiteMaster = enregistrerDiplomeEtSpecialite(diplomeMaster, specialite);
			}
			
			
			
			// sauvegarder les filieres
			filiere1 = getFiliere(lprincipal.get(i), 1);
			filiere2 = getFiliere(lprincipal.get(i), 2);
			
			// Sauvegarder les filieres pour les quelles le candidats a postuler avec priorité
			postuler.setCandidat(candidat);
			postuler.setFiliere(filiere1);
			postuler.setPriorite(1);
			postulerRepository.save(postuler);
			
			postuler = new Postuler();
			postuler.setCandidat(candidat);
			postuler.setFiliere(filiere2);
			postuler.setPriorite(2);
			postulerRepository.save(postuler);
			
				
			// Sauvegarde infos diplome BAC
			obtenu.setDateObtention(lprincipal.get(i).date_diplome_bac);
			obtenu.setMention(lprincipal.get(i).mention_bac);
			obtenu.setEtablissement(etablissement);
			obtenu.setCandidat(candidat);
			obtenu.setDiplome_specialite(diplome_SpecialiteBac);
			
			if(!lprincipal.get(i).date_diplome_bac.isEmpty() && 
					!lprincipal.get(i).moyenne_General_bac.isNaN()) {
				System.out.print("  .....BAC.....");
				obtenu = obtenuRepository.save(obtenu);		
				System.out.println("---here ---");
				enregistrerAnneesEtudes(lprincipal.get(i), "bac", obtenu);
			}
			
			
			if(!lprincipal.get(i).date_diplome_licence.isEmpty() &&
					!lprincipal.get(i).noteS1.isNaN() && !lprincipal.get(i).noteS2.isNaN() &&
					!lprincipal.get(i).noteS3.isNaN() && !lprincipal.get(i).noteS4.isNaN() &&
					!lprincipal.get(i).noteS5.isNaN() && !lprincipal.get(i).noteS6.isNaN()) {
				System.out.print("  .....Licence.....");
				// Sauvegarde infos diplome LICENCE
				obtenu = new Obtenu();
				obtenu.setDateObtention(lprincipal.get(i).date_diplome_licence);
				obtenu.setMention(lprincipal.get(i).mention_licence);
				obtenu.setEtablissement(etablissement);
				obtenu.setCandidat(candidat);
				obtenu.setDiplome_specialite(diplome_SpecialiteLicence);
				
				obtenu = obtenuRepository.save(obtenu);
				enregistrerAnneesEtudes(lprincipal.get(i), "licence", obtenu);
				
			}
			
			
			System.out.print("  .....yes.....");
			if(!lprincipal.get(i).date_diplome_master.isEmpty() &&
					!lprincipal.get(i).noteS7.isNaN() && !lprincipal.get(i).noteS8.isNaN() &&
					!lprincipal.get(i).noteS9.isNaN() && !lprincipal.get(i).noteS10.isNaN()) {
				System.out.print("  .....Master.....");
				// Sauvegarde infos diplome Master
				obtenu = new Obtenu();
				obtenu.setDateObtention(lprincipal.get(i).date_diplome_master);
				obtenu.setMention(lprincipal.get(i).mention_master);
				obtenu.setEtablissement(etablissement);
				obtenu.setCandidat(candidat);
				obtenu.setDiplome_specialite(diplome_SpecialiteMaster);
					
				obtenu = obtenuRepository.save(obtenu);
				enregistrerAnneesEtudes(lprincipal.get(i), "master", obtenu);
			}
			
			
		}
		
	}
	
	
	private Candidat getCandidat(Principal principal) {
		
		Candidat candidat = new Candidat();
		candidat.setNom(principal.nom_candidat);
		candidat.setPrenom(principal.prenom_candidat);
		candidat.setNumTel(principal.numTel_candidat);
		// revoir date
		String[] date = principal.dateNaissance_candidat.split("/");
		String jour = date[0];
		String mois = date[1];
		String annee = date[2];
		Date dateN = new Date(principal.dateNaissance_candidat); 
//		dateN.setDate(Integer.parseInt(jour));
//		dateN.setMonth(Integer.parseInt(mois));
//		dateN.setYear(Integer.parseInt(annee));
		candidat.setDateNaissance(dateN);
		candidat.setMail(principal.email_candidat);
		candidat.setCin(principal.cin_candidat);
		candidat.setCne(principal.cne_candidat);
		
		candidat = candidatRepository.save(candidat);
		System.out.print("  .....candidat.....");
		return candidat;
		
	}
	
	private Ville getVille(Principal principal) {
		
		Ville ville = new Ville();
		Optional<Ville> v = villeRepository.findByNomAllIgnoreCase(principal.ville_etablissement);
		if(v.isPresent()) {
			ville = v.get();
		}else {
			ville.setNom(principal.ville_etablissement);
			ville = villeRepository.save(ville);
		}
		System.out.print("  .....ville.....");
		return ville;
	}
	
	
	private Etablissement getEtablissement(Principal principal, Ville ville) {
		Etablissement etablissement = new Etablissement();
		List<Etablissement> le = etablissementRepository.findByNom(principal.etablissement);
		boolean existe = false;
		if(!le.isEmpty()) {
			for (int i = 0; i < le.size(); i++) {
				System.out.println("---etbb ---");
				if(le.get(i).getVille().getNom().equals(principal.ville_etablissement)) {
					existe = true;
					etablissement = le.get(i);
				}
			}
			
			if(existe == false) {
				etablissement.setNom(principal.etablissement);
				etablissement.setVille(ville);
				etablissement = etablissementRepository.save(etablissement);
			}
			
		}else {
			etablissement.setNom(principal.etablissement);
			etablissement.setVille(ville);
			etablissement = etablissementRepository.save(etablissement);
		}
		System.out.print("  .....etablissement.....");
		return etablissement;
	}
	
	private Specialite getSpecialite(String spec) {
		Specialite specialite = new Specialite();
		Optional<Specialite> s = specialiteRepository.findByNom(spec);
		if(s.isPresent()) {
			specialite = s.get();
		}else {
			specialite.setNom(spec);
			specialite = specialiteRepository.save(specialite);
		}
		System.out.print("  .....specialite.....");
		return specialite;
	}
	
	private Diplome getDiplome(Principal principal, String typeDiplome) {
		Diplome diplome = new Diplome();
		Optional<Diplome> d = diplomeRepository.findByType(typeDiplome);
		if(d.isPresent()) {
			diplome = d.get();
		}else {
			diplome.setType(typeDiplome);
			diplome = diplomeRepository.save(diplome);
		}
		System.out.print("  .....diplome.....");
		return diplome;
	}
	
	private List<Annee_Etudes> enregistrerAnneesEtudes(Principal principal, String typeDiplome, Obtenu obtenu) {
		List<Annee_Etudes> annee_Etudes = new ArrayList<Annee_Etudes>();
		Annee_Etudes ae = new Annee_Etudes();
		if(typeDiplome.equals("bac")) {
			ae.setAnneeScolaire("1");
			ae.setMoyGeneral(Float.parseFloat(principal.moyenne_General_bac.toString()));
			ae.setObtenu(obtenu);
			
			ae = annee_EtudRepository.save(ae);
			annee_Etudes.add(ae);
		}
		if(typeDiplome.equals("licence")) {
			ae.setAnneeScolaire("1");
			ae.setNoteSemester1(Float.parseFloat(principal.noteS1.toString()));
			ae.setNoteSemester2(Float.parseFloat(principal.noteS2.toString()));
			ae.setObtenu(obtenu);
			ae = annee_EtudRepository.save(ae);
			annee_Etudes.add(ae);
			ae = new Annee_Etudes();
			ae.setAnneeScolaire("2");
			ae.setNoteSemester1(Float.parseFloat(principal.noteS3.toString()));
			ae.setNoteSemester2(Float.parseFloat(principal.noteS4.toString()));
			ae.setObtenu(obtenu);
			ae = annee_EtudRepository.save(ae);
			annee_Etudes.add(ae);
			ae = new Annee_Etudes();
			ae.setAnneeScolaire("3");
			ae.setNoteSemester1(Float.parseFloat(principal.noteS5.toString()));
			ae.setNoteSemester2(Float.parseFloat(principal.noteS6.toString()));
			ae.setMoyGeneral(
					(Float.parseFloat(principal.noteS5.toString()) + Float.parseFloat(principal.noteS6.toString()))/2 
					);
			ae.setObtenu(obtenu);
			ae = annee_EtudRepository.save(ae);
			annee_Etudes.add(ae);
		}
		
		if(typeDiplome.equals("master")) {
			ae.setAnneeScolaire("1");
			ae.setNoteSemester1(Float.parseFloat(principal.noteS7.toString()));
			ae.setNoteSemester2(Float.parseFloat(principal.noteS8.toString()));
			ae.setObtenu(obtenu);
			ae = annee_EtudRepository.save(ae);
			
			ae = new Annee_Etudes();
			ae.setAnneeScolaire("2");
			ae.setNoteSemester1(Float.parseFloat(principal.noteS9.toString()));
			ae.setNoteSemester2(Float.parseFloat(principal.noteS10.toString()));
			ae.setObtenu(obtenu);
			ae = annee_EtudRepository.save(ae);
			
		}
		System.out.print("  .....annee_Etudes.....");
		return annee_Etudes;
	}
	
	private Filiere getFiliere(Principal principal, int index) {
		Filiere filiere = new Filiere();
		Optional<Filiere> f;
		if(index == 1)
			f = filiereRepository.findByNom(principal.filiere1);
		else
			f = filiereRepository.findByNom(principal.filiere2);
		if(f.isPresent()) {
			filiere = f.get();
		}else {
			if(index == 1)
				filiere.setNom(principal.filiere1);
			else
				filiere.setNom(principal.filiere2);
			filiere = filiereRepository.save(filiere);
		}
		System.out.print("  .....filiere.....");
		return filiere;
	}
	
	
	private Diplome_Specialite enregistrerDiplomeEtSpecialite(Diplome diplome, Specialite specialite) {
		
		Diplome_Specialite diplome_Specialite = new Diplome_Specialite();
		diplome_Specialite.setDiplome(diplome);
		diplome_Specialite.setSpecialite(specialite);
		
		return diplomeSpecialiteRepository.save(diplome_Specialite);
		
	}
	

}
