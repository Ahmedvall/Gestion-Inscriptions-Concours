package com.ic.entities.evaluation;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Test_ecrit {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idte;
	private Integer nbVrai;
	private Integer nbFaux;
	
	// foreign key idEvaluation references Evaluation(idEvaluation)
    @ManyToOne
	@JoinColumn (name="idEvaluation", referencedColumnName = "idEvaluation")
	private Evaluation evaluation;
    
    // foreign key idMatiere references Matiere(idMatiere)
    @ManyToOne
	@JoinColumn (name="idMatiere", referencedColumnName = "idMatiere")
	private Matiere matiere;
    
	public Test_ecrit() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Test_ecrit(Integer nbVrai, Integer nbFaux) {
		super();
		this.nbVrai = nbVrai;
		this.nbFaux = nbFaux;
	}

	public Long getIdte() {
		return idte;
	}

	public void setIdte(Long idte) {
		this.idte = idte;
	}

	public Integer getNbVrai() {
		return nbVrai;
	}

	public void setNbVrai(Integer nbVrai) {
		this.nbVrai = nbVrai;
	}

	public Integer getNbFaux() {
		return nbFaux;
	}

	public void setNbFaux(Integer nbFaux) {
		this.nbFaux = nbFaux;
	}

	public Evaluation getEvaluation() {
		return evaluation;
	}

	public void setEvaluation(Evaluation evaluation) {
		this.evaluation = evaluation;
	}

	public Matiere getMatiere() {
		return matiere;
	}

	public void setMatiere(Matiere matiere) {
		this.matiere = matiere;
	}

}
