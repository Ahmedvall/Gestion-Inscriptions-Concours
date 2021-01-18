package com.ic.repository.exams;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ic.entities.evaluation.Evaluation;
import com.ic.entities.evaluation.Matiere;
import com.ic.entities.evaluation.Test_ecrit;

public interface TestEcritRepository extends JpaRepository<Test_ecrit, Long> {
	
	List<Test_ecrit> findByEvaluationAndMatiere(Evaluation evaluation, Matiere matiere);
	

}
