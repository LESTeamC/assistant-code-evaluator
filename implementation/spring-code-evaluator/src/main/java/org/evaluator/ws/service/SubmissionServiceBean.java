package org.evaluator.ws.service;

import java.util.List;
import java.util.Set;

import javax.persistence.NoResultException;

import org.evaluator.ws.model.Exam;
import org.evaluator.ws.model.Exercise;
import org.evaluator.ws.model.Submission;
import org.evaluator.ws.repository.ExamRepository;
import org.evaluator.ws.repository.ExerciseRepository;
import org.evaluator.ws.repository.SubmissionRepository;
import java.util.Collection;
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

    @Autowired
    private ExerciseRepository exerciseRepository;
    
    @Autowired
    private ExamRepository examRepository;
    
    @Autowired
    private ExerciseService exerciseService;
    
    @Autowired
    private ExamService examService;
    
	@Override
	public Submission findOne(Long id) {
		
		logger.info("> findSubmission id:{}", id);
		
		Submission submission = submissionRepository.findOne(id);
		
		logger.info("< findSubmission id:{}", id);
		
		return submission;
	}
	
	@Override
	public Collection<Submission> findOpenByExercise (Long exerciseId) {
			
		Collection<Submission> submissions = submissionRepository.findByStatusAndExerciseId("O", exerciseId);		
		return submissions;
	}
	
    @Override
    @Transactional(
            propagation = Propagation.REQUIRED,
            readOnly = false)
    public Submission update(Submission submission) {
        logger.info("> updateSubmission id:{}", submission.getId());

        // Ensure the entity object to be updated exists in the repository to
        // prevent the default behavior of save() which will persist a new
        // entity if the entity matching the id does not exist
        Submission submissionToUpdate = findOne(submission.getId());
        if (submissionToUpdate == null) {
            // Cannot update Greeting that hasn't been persisted
            logger.error(
                    "Attempted to update a Greeting, but the entity does not exist.");
            throw new NoResultException("Requested entity not found.");
        }
        
        submission.setStatus("C");
        Submission updatedSubmission = submissionRepository.save(submission);
        
        //this.updateExamAndExerciseStatus(updatedSubmission);
        this.updateExamAndExercise(updatedSubmission);

        logger.info("< updateSubmission id:{}", updatedSubmission.getId());
        return updatedSubmission;
    }
    
    @Override
    @Transactional(
            propagation = Propagation.REQUIRED,
            readOnly = false)
    public Submission changeComment(Long id, String comment) {
        logger.info("> changeComment id:{}", id);

        // Ensure the entity object to be updated exists in the repository to
        // prevent the default behavior of save() which will persist a new
        // entity if the entity matching the id does not exist
        Submission submissionToUpdate = findOne(id);
        if (submissionToUpdate == null) {
            // Cannot update Greeting that hasn't been persisted
            logger.error(
                    "Attempted to update a Greeting, but the entity does not exist.");
            throw new NoResultException("Requested entity not found.");
        }
        
        submissionToUpdate.setComment(comment);
        Submission updatedSubmission = submissionRepository.save(submissionToUpdate);
        
        logger.info("< changeComment id:{}", id);
        return updatedSubmission;
    }
    
    private void updateExamAndExerciseStatus(Submission submission){
    	
    	
    	if (this.findOpenByExercise(submission.getExercise().getId()).size() == 0) {
    		//updateExercise to Closed
    		
    		Exercise exerciseToUpdate = submission.getExercise();
    		
    		exerciseToUpdate.setStatus("C");
    		Exercise updatedExercise = exerciseRepository.save(exerciseToUpdate);
    		
    		if (exerciseService.findAllOpenByExam(updatedExercise.getExam().getId()).size() == 0) {
    			//updateExam to Closed
    			
    			Exam examToUpdate = updatedExercise.getExam();
    			examToUpdate.setStatus("C");
    			examRepository.save(examToUpdate);
    		}
    	}
    }
    
    private void updateExamAndExercise(Submission submission){
    	
    	Exercise exerciseToUpdate = exerciseRepository.findOne(submission.getExercise().getId());
    	Exam examToUpdate = examRepository.findById(submission.getExercise().getExam().getId());
    	
    	exerciseToUpdate.setProgress(exerciseToUpdate.getProgress() + 1);
    	
    	if (exerciseToUpdate.getProgress() == exerciseToUpdate.getNsubmissions()){
    		exerciseToUpdate.setStatus("C");
    		
    		examToUpdate.setProgress(examToUpdate.getProgress() + 1);
    		if (examToUpdate.getProgress() == examToUpdate.getNquestions()){
    			examToUpdate.setStatus("C");
    		}
    	}
    	
    	exerciseRepository.save(exerciseToUpdate);
    	examRepository.save(examToUpdate);
    }

}
