package com.ic.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Specialite {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idSpec;
	private String nom;
	
	public Specialite() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Specialite(String nom) {
		super();
		this.nom = nom;
	}
	public Long getIdSpec() {
		return idSpec;
	}
	public void setIdSpec(Long idSpec) {
		this.idSpec = idSpec;
	}
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	
}
