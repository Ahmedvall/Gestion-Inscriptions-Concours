package com.ic.entities.evaluation;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Critere {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idCritere;
	private String description;
	
//	@OneToMany(mappedBy = "critere")
//    @JsonIgnoreProperties("critere")
//    private List<Critere_niveau> critere_niveaux = new ArrayList<Critere_niveau>();
	
	public Critere() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Critere(String description) {
		super();
		this.description = description;
	}

	public Long getIdCritere() {
		return idCritere;
	}

	public void setIdCritere(Long idCritere) {
		this.idCritere = idCritere;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

//	public List<Critere_niveau> getCritere_niveaux() {
//		return critere_niveaux;
//	}
//
//	public void setCritere_niveaux(List<Critere_niveau> critere_niveaux) {
//		this.critere_niveaux = critere_niveaux;
//	}

}
