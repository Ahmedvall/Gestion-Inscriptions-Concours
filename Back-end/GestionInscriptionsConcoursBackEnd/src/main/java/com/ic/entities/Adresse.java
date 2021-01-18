package com.ic.entities;

import javax.persistence.Embeddable;

@Embeddable
public class Adresse {
	
	private String adresse;
	private String codePostal;
	public Adresse() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Adresse(String adresse, String codePostal) {
		super();
		this.adresse = adresse;
		this.codePostal = codePostal;
	}

	public String getAdresse() {
		return adresse;
	}
	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}
	public String getCodePostal() {
		return codePostal;
	}
	public void setCodePostal(String codePostal) {
		this.codePostal = codePostal;
	}
	
	
}
