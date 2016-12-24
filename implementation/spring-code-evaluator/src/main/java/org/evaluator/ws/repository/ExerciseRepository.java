package org.evaluator.ws.repository;

import java.util.List;

import org.evaluator.ws.model.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * The ExerciseRepository interface is a Spring Data JPA data repository for
 * Exercise entities.
 * @author Manuel Zamith
 *
 */
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
	
	/**
     * <pre>
     * SELECT a FROM Exercise a WHERE a.status = ?1
     * </pre>
     * 
     * @param status A String status value to query the repository.
     * @return A list of Exercises or <code>null</code> if none found.
     */
	List<Exercise> findByStatus(String status);
	
	/**
     * <pre>
     * SELECT a FROM Exercise a WHERE a.status = ?1 and a.examId = ?2
     * </pre>
     * 
     * @param status A String status value to query the repository.
     * @param examId Long value with the examId to query the repository
     * @return A list of Exercises or <code>null</code> if none found.
     */
	List<Exercise> findByStatusAndExamId (String status, Long examId);

}
