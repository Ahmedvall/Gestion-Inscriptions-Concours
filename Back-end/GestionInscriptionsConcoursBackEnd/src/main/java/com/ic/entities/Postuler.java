package com.ic.entities;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Postuler {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idPostuler;
	
	private int priorite;

    private LocalDateTime dateP;
    
    // foreign key idCandidat references Candidat(id)
    @ManyToOne
	@JoinColumn (name="idCandidat", referencedColumnName = "id")
	private Candidat candidat;
    
    // foreign key idFiliere references Filiere(idFiliere)
    @ManyToOne
	@JoinColumn (name="idFiliere", referencedColumnName = "idFiliere")
	private Filiere filiere;

	public Postuler() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Postuler(LocalDateTime dateP) {
		super();
		this.dateP = dateP;
	}

	public Long getIdPostuler() {
		return idPostuler;
	}

	public void setIdPostuler(Long idPostuler) {
		this.idPostuler = idPostuler;
	}

	public LocalDateTime getDateP() {
		return dateP;
	}

	public void setDateP(LocalDateTime dateP) {
		this.dateP = dateP;
	}

	public Candidat getCandidat() {
		return candidat;
	}

	public void setCandidat(Candidat candidat) {
		this.candidat = candidat;
	}

	public Filiere getFiliere() {
		return filiere;
	}

	public void setFiliere(Filiere filiere) {
		this.filiere = filiere;
	}

	public int getPriorite() {
		return priorite;
	}

	public void setPriorite(int priorite) {
		this.priorite = priorite;
	}
		  
}