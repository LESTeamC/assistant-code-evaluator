package org.evaluator.ws.repository;

import java.util.Collection;
import java.util.List;

import org.evaluator.ws.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * The SubmissionRepository interface is a Spring Data JPA data repository for Submission
 * entities.
 * 
 * @author Manuel Zamith
 * @author Paulo Barbosa
 */
public interface SubmissionRepository extends JpaRepository<Submission, Long> {
	
	 /**
     * Find Submissions By Exercise ID
     * @param exerciseID Exercise ID
     * @return Submissions
     */
    @Query("SELECT s FROM Submission s WHERE s.exercise.id = :exerciseID")
    Collection<Submission> getSubmissionsByExercise(@Param("exerciseID") Long exerciseID);
    
	/**
     * <pre>
     * SELECT a FROM Submission a WHERE a.status = ?1 and a.exerciseId = ?2
     * </pre>
     * 
     * @param status A String with the status to query the repository
     * @param exercise Id A Long value of the exerciseId attribute value
     * @return An Collection of Submission entities or <code>null</code> if none found.
     */
    Collection<Submission> findByStatusAndExerciseId(String status, Long exerciseId);
    
	/**
	 * Queries the repository for a List of Submission entities that belong to a given Exam and Orders by Student Id
     * @param exam Id A Long value of the examId attribute value
     * @return An Collection of Submission entities or <code>null</code> if none found.
     */
    @Query("Select s FROM Submission s, Exercise e WHERE e.exam.id = :examId AND s.exercise.id = e.id ORDER BY s.student.id")
    List<Submission> findByExamIdOrderByStudentId(@Param("examId") Long examId);

}
