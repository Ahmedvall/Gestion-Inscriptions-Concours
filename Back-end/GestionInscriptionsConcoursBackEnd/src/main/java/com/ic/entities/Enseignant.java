package com.ic.entities;

import java.util.Date;

import javax.persistence.Entity;

@Entity
public class Enseignant extends Users {

	public Enseignant() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Enseignant(String nom, String prenom, String numTel, Date dateNaissance, String mail, String motDePass) {
		super(nom, prenom, numTel, dateNaissance, mail, motDePass);
		// TODO Auto-generated constructor stub
	}
	
}
