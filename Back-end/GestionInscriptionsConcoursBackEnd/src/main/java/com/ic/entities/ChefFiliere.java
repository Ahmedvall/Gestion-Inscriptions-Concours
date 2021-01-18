	package com.ic.entities;

import java.util.Date;

import javax.persistence.Entity;

@Entity
public class ChefFiliere extends Users {
	
//	@OneToMany(mappedBy = "chefFiliere")
//    @JsonIgnoreProperties("chefFiliere")
//    private List<Filiere> filiers = new ArrayList<Filiere>();

	public ChefFiliere() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ChefFiliere(String nom, String prenom, String numTel, Date dateNaissance, String mail, String motDePass) {
		super(nom, prenom, numTel, dateNaissance, mail, motDePass);
		// TODO Auto-generated constructor stub
	}

//	public List<Filiere> getFiliers() {
//		return filiers;
//	}
//
//	public void setFiliers(List<Filiere> filiers) {
//		this.filiers = filiers;
//	}


}