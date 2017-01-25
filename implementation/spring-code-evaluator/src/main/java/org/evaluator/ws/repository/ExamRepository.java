package org.evaluator.ws.repository;

import java.util.Collection;
import org.evaluator.ws.model.Exam;
import org.evaluator.ws.model.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ExamRepository extends JpaRepository<Exam, Long> {
    /**
     * Query for a single Exam entity by Id. This method illustrates
     * 
     * <pre>
     * SELECT a FROM Exam a WHERE a.id = ?1
     * </pre>
     * 
     * @param username A Long Id value to query the repository.
     * @return An Account or <code>null</code> if none found.
     */
    Exam findById(Long Id);
    
        /**
     * Find Exams of an Examiner
     * @param examinerID Examiner ID
     * @return Exams
     */
    @Query("SELECT DISTINCT e.exam FROM Exercise e WHERE e.examiner.id = :examinerID")
    Collection<Exam> findExamByExaminer(@Param("examinerID") Long examinerID);
    
    /**
     * Find Open Only Exams of an Examiner
     * @param examinerID Examiner ID
     * @return Exams
     */
    @Query("SELECT DISTINCT e.exam FROM Exercise e WHERE e.examiner.id = :examinerID AND e.exam.status LIKE ('O')")
    Collection<Exam> findOnlyOpenExamByExaminer(@Param("examinerID") Long examinerID);
    
     /**
     * Find Exercises of an Examiner
     * @param usernameID Examiner username
     * @return Exercise
     */
    @Query("SELECT e FROM Exercise e WHERE UPPER(e.examiner.username) LIKE UPPER(:usernameID)")
    Collection<Exercise> findExercisesByExaminer(@Param("usernameID") String usernameID);
    
    /**
     * Find Exercises Of Open Only Exams From of an Examiner
     * @param examinerID Examiner ID
     * @return Exercise
     */
    @Query("SELECT e FROM Exercise e WHERE e.examiner.id = :examinerID AND e.status LIKE ('O')")
    Collection<Exercise> findExerciseOfOnlyOpenExamsByExaminer(@Param("examinerID") Long examinerID);
}
