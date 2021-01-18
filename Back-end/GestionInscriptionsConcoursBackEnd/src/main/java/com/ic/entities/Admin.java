package com.ic.entities;

import java.util.Date;

import javax.persistence.Entity;

@Entity
public class Admin extends Users {

	public Admin() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Admin(String nom, String prenom, String numTel, Date dateNaissance, String mail, String motDePass) {
		super(nom, prenom, numTel, dateNaissance, mail, motDePass);
		// TODO Auto-generated constructor stub
	}

	
}