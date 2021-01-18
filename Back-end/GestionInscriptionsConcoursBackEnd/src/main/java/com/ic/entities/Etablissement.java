package com.ic.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Etablissement {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idEtab;
	private String nom;
	
	// foreign key idVille references Ville(idVille)
    @ManyToOne
	@JoinColumn (name="idVille", referencedColumnName = "idVille")
	private Ville ville;
	
	public Etablissement() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Etablissement(String nom) {
		super();
		this.nom = nom;
	}
	public Long getIdEtab() {
		return idEtab;
	}
	public void setIdEtab(Long idEtab) {
		this.idEtab = idEtab;
	}
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public Ville getVille() {
		return ville;
	}
	public void setVille(Ville ville) {
		this.ville = ville;
	}

	
}
