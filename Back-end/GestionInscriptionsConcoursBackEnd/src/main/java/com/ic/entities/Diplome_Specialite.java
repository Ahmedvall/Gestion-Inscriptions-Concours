package com.ic.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Diplome_Specialite {

	@Id
	@GeneratedValue
	private Long idds;
	
	public Diplome_Specialite() {

	}
	

	public Long getIdds() {
		return idds;
	}

	public void setIdds(Long idds) {
		this.idds = idds;
	}


	// foreign key idDiplome references Diplome(idDiplome)
    @ManyToOne
	@JoinColumn (name="idDiplome", referencedColumnName = "idDiplome")
	private Diplome diplome;
    
    // foreign key idSpec references Specialite(idSpec)
    @ManyToOne
	@JoinColumn (name="idSpec", referencedColumnName = "idSpec")
	private Specialite specialite;
    
    

	public Diplome getDiplome() {
		return diplome;
	}

	public void setDiplome(Diplome diplome) {
		this.diplome = diplome;
	}

	public Specialite getSpecialite() {
		return specialite;
	}

	public void setSpecialite(Specialite specialite) {
		this.specialite = specialite;
	}

}
