package org.evaluator.ws.repository;

import java.util.Collection;

import org.evaluator.ws.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
	
	  /**
     * Find Submissions By Exercise ID
     * @param exerciseID Exercise ID
     * @return Submissions
     */
    @Query("SELECT s FROM Submission s WHERE s.exercise.id = :exerciseID")
    Collection<Submission> getSubmissionsByExercise(@Param("exerciseID") Long exerciseID);
    

}
