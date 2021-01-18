package com.ic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ic.entities.Candidat;
import com.ic.entities.Obtenu;

public interface ObtenuRepository extends JpaRepository<Obtenu, Long> {
	
	//, Diplome_Specialite ds, Diplome d, Specialite s  
	@Query("SELECT DISTINCT  o.candidat "
			+ "FROM Obtenu o, Candidat c, Diplome_Specialite ds, Diplome d, Specialite s, Postuler p, Filiere f,  Annee_Etudes ae "
			+ "WHERE o.candidat = c and o.diplome_specialite = ds "
			+ "and ds.diplome = d and ds.specialite = s "
			+ "and p.candidat = c and p.filiere = f "
			+ "and ae.obtenu = o "
			+ "and o.mention LIKE ?1 and d.type LIKE ?2 and s.nom LIKE ?3 and f.nom LIKE ?4 and p.priorite = ?5 and ae.moyGeneral >= ?6 ")	
	public List<Candidat> selection(String mention, String diplome, String specialite, String filiere, int priorite, float moyenne);
	
	
	@Query("SELECT o.mention FROM Obtenu o Group by o.mention")	
	public List<String> getMentions();
	

}
