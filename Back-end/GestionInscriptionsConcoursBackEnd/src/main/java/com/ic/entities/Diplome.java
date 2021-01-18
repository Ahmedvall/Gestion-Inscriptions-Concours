package com.ic.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Diplome {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idDiplome;
	
	@Column (unique = true)
    private String type;
	
	@OneToMany(mappedBy = "diplome")
    @JsonIgnoreProperties("diplome")
    private List<Diplome_Specialite> dSpecialites = new ArrayList<Diplome_Specialite>();
    
    @Transient
    private List<Specialite> specialites = new ArrayList<Specialite>();

	public Diplome() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	public Diplome(String type) {
	super();
	this.type = type;
}



	public Long getIdDiplome() {
		return idDiplome;
	}

	public void setIdDiplome(Long idDiplome) {
		this.idDiplome = idDiplome;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}


	public List<Diplome_Specialite> getdSpecialites() {
		return dSpecialites;
	}


	public void setdSpecialites(List<Diplome_Specialite> dSpecialites) {
		this.dSpecialites = dSpecialites;
	}


	public List<Specialite> getSpecialites() {
		return specialites;
	}


	public void setSpecialites(List<Specialite> specialites) {
		this.specialites = specialites;
	}

	

	
}