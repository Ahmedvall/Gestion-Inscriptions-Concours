package com.ic.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ic.entities.Candidat;

public interface CandidatRepository extends JpaRepository<Candidat, Long> {
	
	Optional<Candidat> findByCin(String cin); 
	
	@Query("SELECT v.nom, count(*) "
			+ "FROM Obtenu o, Candidat c, Diplome_Specialite ds, Diplome d, Etablissement e, Ville v "
			+ "WHERE c = o.candidat "
			+ "and o.etablissement = e and o.diplome_specialite = ds and ds.diplome = d and d.type LIKE 'licence' "
			+ "and e.ville = v Group by v.nom")	
	public List<Object> getStatistiqueParRegion();
	
	@Query("SELECT e.nom, count(*) "
			+ "FROM Obtenu o, Candidat c, Diplome_Specialite ds, Diplome d, Etablissement e, Ville v "
			+ "WHERE c = o.candidat "
			+ "and o.etablissement = e and o.diplome_specialite = ds "
			+ "and ds.diplome = d and e.ville = v and d.type LIKE 'licence' "
			+ " Group by e.nom")	
	public List<Object> getStatistiqueParEtablissement();
	
	
	@Query("SELECT f.nom, count(*) "
			+ "FROM Candidat c, Postuler p, Filiere f "
			+ "WHERE c = p.candidat "
			+ "and p.filiere = f and p.priorite = ?1 "
			+ "Group by f.nom")	
	public List<Object> getStatistiqueParFilieresPriorite(int priorite);
	

}
