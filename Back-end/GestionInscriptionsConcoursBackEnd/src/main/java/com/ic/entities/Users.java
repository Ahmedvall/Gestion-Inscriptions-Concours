package com.ic.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Inheritance (strategy = InheritanceType.TABLE_PER_CLASS)
public class Users {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

    private String nom;

    private String prenom;

    private String numTel;

    private Date dateNaissance;
    
    @Column(unique = true)
    private String mail;

    private String motDePass;
    
    private String sexe;
    
    @Embedded
	Adresse adresse;
    
    
	// foreign key idRole references USERS(idRole)
    @ManyToOne
    @JsonIgnoreProperties("users")
	@JoinColumn (name="idRole", referencedColumnName = "idRole")
	private Role role;
    
   

	public Users() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Users(String nom, String prenom, String numTel, Date dateNaissance, String mail, String motDePass) {
		super();
		this.nom = nom;
		this.prenom = prenom;
		this.numTel = numTel;
		this.dateNaissance = dateNaissance;
		this.mail = mail;
		this.motDePass = motDePass;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public String getNumTel() {
		return numTel;
	}

	public void setNumTel(String numTel) {
		this.numTel = numTel;
	}

	public Date getDateNaissance() {
		return dateNaissance;
	}

	public void setDateNaissance(Date dateNaissance) {
		this.dateNaissance = dateNaissance;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public String getMotDePass() {
		return motDePass;
	}

	public void setMotDePass(String motDePass) {
		this.motDePass = motDePass;
	}

	public String getSexe() {
		return sexe;
	}

	public void setSexe(String sexe) {
		this.sexe = sexe;
	}

	public Adresse getAdresse() {
		return adresse;
	}

	public void setAdresse(Adresse adresse) {
		this.adresse = adresse;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

}