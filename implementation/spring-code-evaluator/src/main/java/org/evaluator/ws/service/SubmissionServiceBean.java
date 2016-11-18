package org.evaluator.ws.service;

import org.evaluator.ws.model.Submission;
import org.evaluator.ws.repository.SubmissionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(
        propagation = Propagation.SUPPORTS,
        readOnly = true)
public class SubmissionServiceBean implements SubmissionService {
	
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    /**
     * The Spring Data repository for Student entities.
     */
    @Autowired
    private SubmissionRepository submissionRepository;

	@Override
	public Submission findOne(Long id) {
		
		logger.info("> findSubmission id:{}", id);
		
		Submission submission = submissionRepository.findOne(id);
		
		logger.info("< findSubmission id:{}", id);
		
		return submission;
	}

}
