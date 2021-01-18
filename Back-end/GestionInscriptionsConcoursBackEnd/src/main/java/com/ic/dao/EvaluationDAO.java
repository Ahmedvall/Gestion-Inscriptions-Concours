package com.ic.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ic.entities.Candidat;
import com.ic.entities.evaluation.Critere;
import com.ic.entities.evaluation.Critere_niveau;
import com.ic.entities.evaluation.Evaluation;
import com.ic.entities.evaluation.Matiere;
import com.ic.entities.evaluation.Niveau;
import com.ic.entities.evaluation.Test_ecrit;
import com.ic.entities.evaluation.Test_oral;
import com.ic.repository.CandidatRepository;
import com.ic.repository.CritereRepository;
import com.ic.repository.MatiereRepository;
import com.ic.repository.NiveauRepository;
import com.ic.repository.exams.CritereNiveauRepository;
import com.ic.repository.exams.EvaluationRepository;
import com.ic.repository.exams.TestEcritRepository;
import com.ic.repository.exams.TestOralRepository;

@Service
public class EvaluationDAO {
	
	@Autowired EvaluationRepository evaluationRepository;
	@Autowired CritereNiveauRepository critereNiveauRepository;
	@Autowired TestOralRepository oralRepository;
	@Autowired TestEcritRepository testEcritRepository;
	@Autowired CritereRepository critereRepository;
	@Autowired NiveauRepository niveauRepository;
	@Autowired CandidatRepository candidatRepository;
	@Autowired MatiereRepository matiereRepository;
	
	
	public Candidat ajoutEvaluationOrale(Test_oral testOral, Long idCandidat) {
		
		Test_oral orale = new Test_oral(); 
		orale.setNoteMembre1(testOral.getNoteMembre1());
		orale.setNoteMembre2(testOral.getNoteMembre2());
		orale.setObservation(testOral.getObservation());
		orale = oralRepository.save(orale);
		
		for (Critere_niveau cn : testOral.getCritere_niveaux()) {
			Optional<Niveau> niveau = niveauRepository.findById(cn.getNiveau().getIdNiveau());
			Optional<Critere> critere = critereRepository.findById(cn.getCritere().getIdCritere());
			cn.setCritere(critere.get());
			cn.setNiveau(niveau.get());
			cn.setTest_oral(orale);
			cn.setCocher(true);
			critereNiveauRepository.save(cn);
		}
		
		Candidat candidat = candidatRepository.findById(idCandidat).get();
		
		Evaluation evaluation = new Evaluation();
		
		if(candidat.getEvaluation() != null) {
			evaluation = candidat.getEvaluation();
			evaluation.setTest_oral(orale);
			evaluation = evaluationRepository.save(evaluation);
		}else {
			evaluation.setTest_oral(orale);
			evaluation = evaluationRepository.save(evaluation);
			candidat.setEvaluation(evaluation);
			candidatRepository.save(candidat);
		}
		
		return candidat;
		
		
	}
	
	
	public Candidat majEvaluationOrale(Test_oral testOral, Long idCandidat) {
		
		Optional<Test_oral> orale = oralRepository.findById(testOral.getIdto());
		
		if(orale.isPresent()) {
			
			orale.get().setNoteMembre1(testOral.getNoteMembre1());
			orale.get().setNoteMembre2(testOral.getNoteMembre2());
			orale.get().setObservation(testOral.getObservation());
			Test_oral oraleUpdated = oralRepository.save(orale.get());
			
			Candidat candidat = candidatRepository.findById(idCandidat).get();
			
			for (Critere_niveau cn : candidat.getEvaluation().getTest_oral().getCritere_niveaux()) {
				critereNiveauRepository.deleteById(cn.getIdcn());
			}	
			
			for (Critere_niveau cn : testOral.getCritere_niveaux()) {
				Critere critere = critereRepository.findById(cn.getCritere().getIdCritere()).get();
				Niveau niveau = niveauRepository.findById(cn.getNiveau().getIdNiveau()).get();
				cn.setCritere(critere);
				cn.setNiveau(niveau);
				cn.setTest_oral(oraleUpdated);
				cn.setCocher(true);
				critereNiveauRepository.save(cn);
				
			}
			
			
			return candidatRepository.findById(idCandidat).get();
			
		}else return null;
		
	}
	
	
	
	// Test Ecrit......
	
	public Candidat ajoutEvaluationEcrit(List<Test_ecrit> testEcrits, Long idCandidat) {
		

		Candidat candidat = candidatRepository.findById(idCandidat).get();
		
		Evaluation evaluation = new Evaluation();
		
		if(candidat.getEvaluation() != null) {
			evaluation = candidat.getEvaluation();
		}else {
			evaluation = evaluationRepository.save(evaluation);
			candidat.setEvaluation(evaluation);
			candidatRepository.save(candidat);
		}
		
		
		for (Test_ecrit test_ecrit : testEcrits) {
			Matiere matiere = matiereRepository.findById(test_ecrit.getMatiere().getIdMatiere()).get();
			test_ecrit.setEvaluation(evaluation);
			test_ecrit.setMatiere(matiere);
			testEcritRepository.save(test_ecrit);
		}
		
		
		return candidatRepository.findById(idCandidat).get();
		
		
	}
	
	
	public Candidat ajoutEvaluationEcritMatiere(Test_ecrit testEcrit, Long idCandidat) {
		
		
		Optional<Candidat> candidat = candidatRepository.findById(idCandidat);
		if(candidat.isPresent()) {
			Optional<Matiere> matiere = matiereRepository.findById(testEcrit.getMatiere().getIdMatiere());
			if(candidat.get().getEvaluation() != null && matiere.isPresent()) {
				List<Test_ecrit> results = testEcritRepository.findByEvaluationAndMatiere(candidat.get().getEvaluation(), matiere.get());
				if(results.size() <= 0) {
					Test_ecrit saveTestEcrit = new Test_ecrit();
					saveTestEcrit.setMatiere(matiere.get());
					saveTestEcrit.setEvaluation(candidat.get().getEvaluation());
					saveTestEcrit.setNbFaux(testEcrit.getNbFaux());
					saveTestEcrit.setNbVrai(testEcrit.getNbVrai());
					testEcritRepository.save(saveTestEcrit);
				}else {
					return null;
				}
			}else if(candidat.get().getEvaluation() == null && matiere.isPresent()) {
				Evaluation evaluation = new Evaluation();
				evaluation = evaluationRepository.save(evaluation);
				candidat.get().setEvaluation(evaluation);
				candidatRepository.save(candidat.get());
				
				// savegarde Test Ecrit:
				Test_ecrit saveTestEcrit = new Test_ecrit();
				saveTestEcrit.setMatiere(matiere.get());
				saveTestEcrit.setEvaluation(evaluation);
				saveTestEcrit.setNbFaux(testEcrit.getNbFaux());
				saveTestEcrit.setNbVrai(testEcrit.getNbVrai());
				testEcritRepository.save(saveTestEcrit);
				
			}else {
				return null;
			}
			
		}else {
			return null;
		}
				
		Candidat ans = candidatRepository.findById(idCandidat).get();
		return ans;
		
		
	}
	
	
	public Candidat majEvaluationEcritMatiere(Test_ecrit testEcrit, Long idCandidat) {
		
		
		Optional<Candidat> candidat = candidatRepository.findById(idCandidat);
		if(candidat.isPresent()) {
			Optional<Matiere> matiere = matiereRepository.findById(testEcrit.getMatiere().getIdMatiere());
			if(candidat.get().getEvaluation() != null && matiere.isPresent()) {
				List<Test_ecrit> results = testEcritRepository.findByEvaluationAndMatiere(candidat.get().getEvaluation(), matiere.get());
				if(results.size() > 0) {
					Test_ecrit updateTestEcrit = new Test_ecrit();
					updateTestEcrit = results.get(0);
					updateTestEcrit.setMatiere(matiere.get());
					updateTestEcrit.setEvaluation(candidat.get().getEvaluation());
					updateTestEcrit.setNbFaux(testEcrit.getNbFaux());
					updateTestEcrit.setNbVrai(testEcrit.getNbVrai());
					testEcritRepository.save(updateTestEcrit);
				}else {
					return null;
				}
			}else {
				return null;
			}
			
		}else {
			return null;
		}
				
		return candidatRepository.findById(idCandidat).get();
		
		
	}
	
	
	
	public Candidat majEvaluationEcrit(List<Test_ecrit> testEcrits, Long idCandidat) {
		
		Candidat candidat = candidatRepository.findById(idCandidat).get();
		Evaluation evaluation = candidat.getEvaluation();
		
		for (Test_ecrit test_ecrit : candidat.getEvaluation().getTestesEcris()) {
			testEcritRepository.deleteById(test_ecrit.getIdte());
		}
		
		for (Test_ecrit test_ecrit : testEcrits) {
			Matiere matiere = matiereRepository.findById(test_ecrit.getMatiere().getIdMatiere()).get();
			test_ecrit.setEvaluation(evaluation);
			test_ecrit.setMatiere(matiere);
			testEcritRepository.save(test_ecrit);
		}
		
		
		return candidatRepository.findById(idCandidat).get();
		
		
	}
	
	
	
	
	

}
