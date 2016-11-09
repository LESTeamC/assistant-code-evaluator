package org.evaluator.ws.repository;

import org.evaluator.ws.model.Examiner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExaminerRepository extends JpaRepository<Examiner, Long> {
    
	/**
     * <pre>
     * SELECT a FROM Examiner a WHERE a.name = ?1
     * </pre>
     * 
     * @param username A String name value to query the repository.
     * @return An Exam or <code>null</code> if none found.
     */
    Examiner findByName(String name);
    
	/**
     * <pre>
     * SELECT a FROM Examiner a WHERE a.name = ?1
     * </pre>
     * 
     * @param username A String name value to query the repository.
     * @return An Exam or <code>null</code> if none found.
     */
    Examiner findByUsername(String name);
    
}
