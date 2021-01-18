package com.ic.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Annee_Etudes {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idae;

    private String anneeScolaire;

    private float noteSemester1;

    private float noteSemester2;

    private float moyGeneral;
    
    // foreign key idOB references Obtenu(idOB)
    @ManyToOne
	@JoinColumn (name="idOB", referencedColumnName = "idOB")
	private Obtenu obtenu;

	public Annee_Etudes() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Annee_Etudes(String anneeScolaire, float noteSemester1, float noteSemester2, float moyGeneral) {
		super();
		this.anneeScolaire = anneeScolaire;
		this.noteSemester1 = noteSemester1;
		this.noteSemester2 = noteSemester2;
		this.moyGeneral = moyGeneral;
	}

	public Long getIdae() {
		return idae;
	}

	public void setIdae(Long idae) {
		this.idae = idae;
	}

	public String getAnneeScolaire() {
		return anneeScolaire;
	}

	public void setAnneeScolaire(String anneeScolaire) {
		this.anneeScolaire = anneeScolaire;
	}

	public float getNoteSemester1() {
		return noteSemester1;
	}

	public void setNoteSemester1(float noteSemester1) {
		this.noteSemester1 = noteSemester1;
	}

	public float getNoteSemester2() {
		return noteSemester2;
	}

	public void setNoteSemester2(float noteSemester2) {
		this.noteSemester2 = noteSemester2;
	}

	public float getMoyGeneral() {
		return moyGeneral;
	}

	public void setMoyGeneral(float moyGeneral) {
		this.moyGeneral = moyGeneral;
	}

	public Obtenu getObtenu() {
		return obtenu;
	}

	public void setObtenu(Obtenu obtenu) {
		this.obtenu = obtenu;
	}
	
}