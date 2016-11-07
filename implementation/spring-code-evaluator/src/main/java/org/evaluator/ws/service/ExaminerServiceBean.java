package org.evaluator.ws.service;

import org.evaluator.ws.model.Account;
import org.evaluator.ws.model.Examiner;
import org.evaluator.ws.repository.ExaminerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * The ExaminerServiceBean encapsulates all business behaviors for operations on
 * the Examiner entity
 * 
 * @author Manuel Zamith
 */
@Service
public class ExaminerServiceBean implements ExaminerService {
	
    /**
     * The Logger for this class.
     */
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    
    /**
     * The Spring Data repository for Examniner entities.
     */
    @Autowired
    private ExaminerRepository examinerRepository;

	@Override
	public Examiner findByUsername(String username) {
        logger.info("> findExaminerByUsername");
        Examiner examiner = examinerRepository.findByUsername(username);

        logger.info("< findExaminerByUsername");
        return examiner;
	}

}