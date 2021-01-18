package com.ic.repository.exams;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ic.entities.evaluation.Evaluation;

public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {

}
