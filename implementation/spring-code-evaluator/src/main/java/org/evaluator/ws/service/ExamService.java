package org.evaluator.ws.service;

import java.util.Collection;

import org.evaluator.ws.model.Exam;

public interface ExamService {
	
    /**
     * Find an Exam by the id attribute value.
     * 
     * @param id A Long Id to query the repository.
     * @return An Exam instance or <code>null</code> if none found.
     */
    Exam findById(Long id);
    
    Collection<Exam> findAll();

}
