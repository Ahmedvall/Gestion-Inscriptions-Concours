package com.ic.entities.evaluation;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Critere_niveau {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idcn;
	private boolean cocher;
	
	// foreign key idCritere references Critere(idCritere)
    @ManyToOne
	@JoinColumn (name="idCritere", referencedColumnName = "idCritere")
	private Critere critere;
    
    // foreign key idNiveau references Niveau(idNiveau)
    @ManyToOne
	@JoinColumn (name="idNiveau", referencedColumnName = "idNiveau")
	private Niveau niveau;
    
    // foreign key idto references Test_oral(idto)
    @ManyToOne
	@JoinColumn (name="idto", referencedColumnName = "idto")
	private Test_oral test_oral;
	
	public Critere_niveau() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Critere_niveau(boolean cocher) {
		super();
		this.cocher = cocher;
	}

	public Long getIdcn() {
		return idcn;
	}

	public void setIdcn(Long idcn) {
		this.idcn = idcn;
	}

	public boolean isCocher() {
		return cocher;
	}

	public void setCocher(boolean cocher) {
		this.cocher = cocher;
	}

	public Critere getCritere() {
		return critere;
	}

	public void setCritere(Critere critere) {
		this.critere = critere;
	}

	public Niveau getNiveau() {
		return niveau;
	}

	public void setNiveau(Niveau niveau) {
		this.niveau = niveau;
	}

	public Test_oral getTest_oral() {
		return test_oral;
	}

	public void setTest_oral(Test_oral test_oral) {
		this.test_oral = test_oral;
	}

	
	
}
