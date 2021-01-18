package com.ic.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Obtenu {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idOB;
	private String dateObtention;
	private String mention; 
	
	// foreign key idCandidat references Candidat(id)
    @ManyToOne
	@JoinColumn (name="idCandidat", referencedColumnName = "id")
	private Candidat candidat;
    
    // foreign key idEtab references Etablissement(idEtab)
    @ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn (name="idEtab", referencedColumnName = "idEtab")
	private Etablissement etablissement;
    
    // foreign key idds references Diplome_Specialite(idds)
    @ManyToOne
	@JoinColumn (name="idds", referencedColumnName = "idds")
	private Diplome_Specialite diplome_specialite;
    
    @OneToMany(mappedBy = "obtenu")
    @JsonIgnoreProperties("obtenu")
    private List<Annee_Etudes> anneesEtudes = new ArrayList<Annee_Etudes>();
	
	public Obtenu() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Obtenu(String dateObtention) {
		super();
		this.dateObtention = dateObtention;
	}
	public Long getIdOB() {
		return idOB;
	}
	public void setIdOB(Long idOB) {
		this.idOB = idOB;
	}
	public String getDateObtention() {
		return dateObtention;
	}
	public void setDateObtention(String dateObtention) {
		this.dateObtention = dateObtention;
	}
	public Candidat getCandidat() {
		return candidat;
	}
	public void setCandidat(Candidat candidat) {
		this.candidat = candidat;
	}
	
	public Etablissement getEtablissement() {
		return etablissement;
	}
	public void setEtablissement(Etablissement etablissement) {
		this.etablissement = etablissement;
	}

	public List<Annee_Etudes> getAnneesEtudes() {
		return anneesEtudes;
	}
	public void setAnneesEtudes(List<Annee_Etudes> anneesEtudes) {
		this.anneesEtudes = anneesEtudes;
	}
	public String getMention() {
		return mention;
	}
	public void setMention(String mention) {
		this.mention = mention;
	}
	public Diplome_Specialite getDiplome_specialite() {
		return diplome_specialite;
	}
	public void setDiplome_specialite(Diplome_Specialite diplome_specialite) {
		this.diplome_specialite = diplome_specialite;
	}
	
		
}
