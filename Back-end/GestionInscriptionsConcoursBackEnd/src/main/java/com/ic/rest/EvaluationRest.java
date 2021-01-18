package com.ic.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ic.dao.EvaluationDAO;
import com.ic.entities.Candidat;
import com.ic.entities.evaluation.Test_ecrit;
import com.ic.entities.evaluation.Test_oral;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/evaluation")
public class EvaluationRest {
	
	@Autowired EvaluationDAO evaluationDAO;

	
	@PostMapping("/orale/ajout/{idCdd}")
	public Candidat ajoutEvaluationOrale(@PathVariable Long idCdd, @RequestBody Test_oral testOral) {
		return evaluationDAO.ajoutEvaluationOrale(testOral, idCdd);
	}
	
	
	@PutMapping("/orale/maj/{idCdd}")
	public Candidat majEvaluationOrale(@PathVariable Long idCdd, @RequestBody Test_oral testOral) {
		return evaluationDAO.majEvaluationOrale(testOral, idCdd);
	}
	
	@PostMapping("/ecrit/ajout/{idCdd}")
	public Candidat ajoutEvaluationEcrit(@PathVariable Long idCdd, @RequestBody List<Test_ecrit> testEcrits) {
		return evaluationDAO.ajoutEvaluationEcrit(testEcrits, idCdd);
	}
	
	@PostMapping("/ecrit/ajoutNoteMatiere/{idCdd}")
	public Candidat ajoutEvaluationEcritMatiere(@PathVariable Long idCdd, @RequestBody Test_ecrit testEcrit) {
		return evaluationDAO.ajoutEvaluationEcritMatiere(testEcrit, idCdd);
	}
	
	
	@PutMapping("/ecrit/majNoteMatiere/{idCdd}")
	public Candidat majEvaluationEcritMatiere(@PathVariable Long idCdd, @RequestBody Test_ecrit testEcrit) {
		return evaluationDAO.majEvaluationEcritMatiere(testEcrit, idCdd);
	}
	
	
	@PutMapping("/ecrit/maj/{idCdd}")
	public Candidat majEvaluationEcrit(@PathVariable Long idCdd, @RequestBody List<Test_ecrit> testEcrits) {
		return evaluationDAO.majEvaluationEcrit(testEcrits, idCdd);
	}

}
