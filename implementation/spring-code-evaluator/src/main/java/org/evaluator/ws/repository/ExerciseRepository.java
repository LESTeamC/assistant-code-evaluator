package org.evaluator.ws.repository;

import java.util.List;

import org.evaluator.ws.model.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
	
	List<Exercise> findByStatus(String status);
	
	List<Exercise> findByStatusAndExamId (String status, Long examId);

}
