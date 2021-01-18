package com.ic.entities.evaluation;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Niveau {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idNiveau;
	private String libelle;
	private Integer cout;
	
	
	public Niveau() {
		super();
		// TODO Auto-generated constructor stub
	}



	public Niveau(String libelle, Integer cout) {
		super();
		this.libelle = libelle;
		this.cout = cout;
	}



	public Long getIdNiveau() {
		return idNiveau;
	}

	public void setIdNiveau(Long idNiveau) {
		this.idNiveau = idNiveau;
	}

	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}



	public Integer getCout() {
		return cout;
	}



	public void setCout(Integer cout) {
		this.cout = cout;
	}

	
	
}
