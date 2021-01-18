package com.ic.entities;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ic.entities.evaluation.Evaluation;

@Entity
public class Candidat extends Users {
	
	@Column (unique = true)
    private String cin;
	
	@Column (unique = true)
    private String cne;
    
    
    @OneToMany(mappedBy = "candidat")
    @JsonIgnoreProperties("candidat")
    private List<Postuler> listpost = new ArrayList<Postuler>();
    
    
    @OneToMany(mappedBy = "candidat")
    @JsonIgnoreProperties("candidat")
    private List<Obtenu> obtenues = new ArrayList<Obtenu>();
    

    // foreign key idEvaluation references Evaluation(idEvaluation)
    @OneToOne
    @JoinColumn(name = "idEvaluation", referencedColumnName = "idEvaluation")
    private Evaluation evaluation;

	public Candidat() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Candidat(String nom, String prenom, String numTel, Date dateNaissance, String mail, String motDePass) {
		super(nom, prenom, numTel, dateNaissance, mail, motDePass);
		// TODO Auto-generated constructor stub
	}

	public Candidat(String cin, String cne) {
		super();
		this.cin = cin;
		this.cne = cne;
	}

	public String getCin() {
		return cin;
	}

	public void setCin(String cin) {
		this.cin = cin;
	}

	public String getCne() {
		return cne;
	}

	public void setCne(String cne) {
		this.cne = cne;
	}

	public List<Postuler> getListpost() {
		return listpost;
	}

	public void setListpost(List<Postuler> listpost) {
		this.listpost = listpost;
	}

	public List<Obtenu> getObtenues() {
		return obtenues;
	}

	public void setObtenues(List<Obtenu> obtenues) {
		this.obtenues = obtenues;
	}

	public Evaluation getEvaluation() {
		return evaluation;
	}

	public void setEvaluation(Evaluation evaluation) {
		this.evaluation = evaluation;
	}

}