package com.ic.entities.evaluation;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Matiere {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idMatiere;
	private String nom;
	private int nbQuestion;

	
	public Matiere() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Matiere(String nom, int nbQuestion) {
		super();
		this.nom = nom;
		this.nbQuestion = nbQuestion;
	}

	public Long getIdMatiere() {
		return idMatiere;
	}

	public void setIdMatiere(Long idMatiere) {
		this.idMatiere = idMatiere;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public int getNbQuestion() {
		return nbQuestion;
	}

	public void setNbQuestion(int nbQuestion) {
		this.nbQuestion = nbQuestion;
	}

	
}
