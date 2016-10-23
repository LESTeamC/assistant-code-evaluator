package org.evaluator.ws.service;

import java.util.Collection;

import org.evaluator.ws.model.Exam;
import org.evaluator.ws.repository.ExamRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class ExamServiceBean implements ExamService {

    /**
     * The Logger for this class.
     */
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    
    /**
     * The Spring Data repository for Exam entities.
     */
    @Autowired
    private ExamRepository examRepository;
    
    
    @Override
    public Exam findById(Long id) {
        logger.info("> findById");
        Exam exam = examRepository.findById(id);

        logger.info("< findById");
        return exam;
    }
    
    @Override
    public Collection<Exam> findAll(){
    	logger.info("> findAll");
        Collection<Exam> exams = examRepository.findAll();

        logger.info("< findById");
        return exams;
    }
}
