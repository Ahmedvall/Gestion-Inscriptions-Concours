package com.ic.entities.evaluation;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Test_oral {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idto;
	
	private Float noteMembre1;
	private Float noteMembre2;
	private String observation;
	
	@OneToMany(mappedBy = "test_oral")
    @JsonIgnoreProperties("test_oral")
    private List<Critere_niveau> critere_niveaux = new ArrayList<Critere_niveau>();
 
	

	public Test_oral() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Test_oral(Float noteMembre1, Float noteMembre2, String observation) {
		super();
		this.noteMembre1 = noteMembre1;
		this.noteMembre2 = noteMembre2;
		this.observation = observation;
	}

	public Long getIdto() {
		return idto;
	}

	public void setIdto(Long idto) {
		this.idto = idto;
	}

	public Float getNoteMembre1() {
		return noteMembre1;
	}

	public void setNoteMembre1(Float noteMembre1) {
		this.noteMembre1 = noteMembre1;
	}

	public Float getNoteMembre2() {
		return noteMembre2;
	}

	public void setNoteMembre2(Float noteMembre2) {
		this.noteMembre2 = noteMembre2;
	}

	public String getObservation() {
		return observation;
	}

	public void setObservation(String observation) {
		this.observation = observation;
	}

	public List<Critere_niveau> getCritere_niveaux() {
		return critere_niveaux;
	}

	public void setCritere_niveaux(List<Critere_niveau> critere_niveaux) {
		this.critere_niveaux = critere_niveaux;
	}


}
