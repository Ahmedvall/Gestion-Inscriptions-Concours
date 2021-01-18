package com.ic.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Ville {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO )
	private Long idVille;
	@Column (unique = true)
	private String nom;
	
	public Ville() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Ville(String nom) {
		super();
		this.nom = nom;
	}
	public Long getIdVille() {
		return idVille;
	}
	public void setIdVille(Long idVille) {
		this.idVille = idVille;
	}
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}

}
