package com.ic.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table (name = "Filiere")
public class Filiere {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idFiliere;
	
	@Column (unique = true)
    private String nom;

    private Date dateCreation;

    private String description;
    
    // foreign key idChefFiliere references Users(id)
    @ManyToOne
	@JoinColumn (name="idChefFiliere", referencedColumnName = "id")
	private Users chefFiliere;
    
//    @OneToMany(mappedBy = "filiere")
//    @JsonIgnoreProperties("filiere")
//    private List<Postuler> lpostFiliere = new ArrayList<Postuler>();

	public Filiere() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Filiere(String nom, Date dateCreation, String description) {
		super();
		this.nom = nom;
		this.dateCreation = dateCreation;
		this.description = description;
	}

	public Long getIdFiliere() {
		return idFiliere;
	}

	public void setIdFiliere(Long idFiliere) {
		this.idFiliere = idFiliere;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public Date getDateCreation() {
		return dateCreation;
	}

	public void setDateCreation(Date dateCreation) {
		this.dateCreation = dateCreation;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

//	public List<Postuler> getLpostFiliere() {
//		return lpostFiliere;
//	}
//
//	public void setLpostFiliere(List<Postuler> lpostFiliere) {
//		this.lpostFiliere = lpostFiliere;
//	}

	public Users getChefFiliere() {
		return chefFiliere;
	}

	public void setChefFiliere(Users chefFiliere) {
		this.chefFiliere = chefFiliere;
	}
	
}