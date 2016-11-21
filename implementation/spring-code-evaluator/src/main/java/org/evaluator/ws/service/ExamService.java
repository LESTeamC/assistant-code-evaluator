package org.evaluator.ws.service;

import java.util.Collection;

import org.evaluator.ws.model.Exam;
import org.evaluator.ws.model.Exercise;
import org.evaluator.ws.model.ExerciseDTO;


public interface ExamService {
	
    /**
     * Find an Exam by the id attribute value.
     * 
     * @param id A Long Id to query the repository.
     * @return An Exam instance or <code>null</code> if none found.
     */
    Exam findById(Long id);
    
    Exam findBySubmissionId(Long id);
    
    Collection<Exam> findAll();
    
    Exam create(Exam exam);
	
    Collection<Exam> findByExaminer(Long examinerID);
    
    Collection<ExerciseDTO> findExamsByExaminer(String usernameID);

}
