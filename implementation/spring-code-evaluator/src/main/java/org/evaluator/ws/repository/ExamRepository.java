package org.evaluator.ws.repository;

import org.evaluator.ws.model.Exam;
import org.springframework.data.jpa.repository.JpaRepository;

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
}
