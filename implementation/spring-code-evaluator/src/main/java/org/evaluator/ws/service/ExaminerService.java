package org.evaluator.ws.service;

import java.util.Collection;

import org.evaluator.ws.model.Examiner;

/**
 * The ExaminerService interface defines all public business behaviors for
 * operations on the Examiner entity model
 * 
 * This interface should be injected into ExaminerService clients, not the
 * implementation bean.
 * 
 * @author Manuel Zamith
 */
public interface ExaminerService {
	
    /**
     * Find an Examiner by the username attribute value.
     * 
     * @param username A String username to query the repository.
     * @return An Examiner instance or <code>null</code> if none found.
     */
    Examiner findByUsername(String username);
    
    /**
     * Find The complete collection of Examiners
     * 
     * @return A Collection of  Examiners or <code>null</code> if none found.
     */
    Collection<Examiner> findAll();
    
    Examiner findOne(Long id);

}
