package com.ic.entities.evaluation;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Evaluation {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idEvaluation;

	
    @OneToMany(mappedBy = "evaluation")
    @JsonIgnoreProperties("evaluation")
    private List<Test_ecrit> testesEcris = new ArrayList<Test_ecrit>();

    // foreign key idto references Test_oral(idto)
    @OneToOne
    @JoinColumn(name = "idto", referencedColumnName = "idto")
    private Test_oral test_oral;
    
	
	public Evaluation() {
		super();
		// TODO Auto-generated constructor stub
	}


	public Evaluation(Long idEvaluation) {
		this.idEvaluation = idEvaluation;
	}


	public Long getIdEvaluation() {
		return idEvaluation;
	}


	public void setIdEvaluation(Long idEvaluation) {
		this.idEvaluation = idEvaluation;
	}


	public List<Test_ecrit> getTestesEcris() {
		return testesEcris;
	}


	public void setTestesEcris(List<Test_ecrit> testesEcris) {
		this.testesEcris = testesEcris;
	}


	public Test_oral getTest_oral() {
		return test_oral;
	}


	public void setTest_oral(Test_oral test_oral) {
		this.test_oral = test_oral;
	}
	
	


}
