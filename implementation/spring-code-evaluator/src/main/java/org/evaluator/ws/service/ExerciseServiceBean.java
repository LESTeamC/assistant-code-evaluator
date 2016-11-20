package org.evaluator.ws.service;

import java.util.Collection;

import javax.persistence.NoResultException;

import org.evaluator.ws.model.Examiner;
import org.evaluator.ws.model.Exercise;
import org.evaluator.ws.model.Submission;
import org.evaluator.ws.repository.ExerciseRepository;
import org.evaluator.ws.repository.SubmissionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;


/**
 * The ExerciseServiceBean encapsulates all business behaviors operating on the
 * Exercise entity model object.
 * 
 * @author Manuel Zamith
 */
@Service
@Transactional(
        propagation = Propagation.SUPPORTS,
        readOnly = true)
public class ExerciseServiceBean implements ExerciseService {
	
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
    /**
     * The Spring Data repository for Exercise entities.
     */
    @Autowired
    private ExerciseRepository exerciseRepository;
    @Autowired
    private SubmissionRepository submissionRepository;
    
    @Override
    public Collection<Exercise> findAll() {
        logger.info("> ExercisefindAll");


        Collection<Exercise> exercises = exerciseRepository.findAll();

        logger.info("< ExercisefindAll");
        return exercises;
    }
    
    @Override
    public Collection<Exercise> findAllOpen() {
        logger.info("> ExercisefindOpen");


        Collection<Exercise> exercises = exerciseRepository.findByStatus("O");

        logger.info("< ExercisefindOpen");
        return exercises;
    }
    
    @Override
    public Collection<Exercise> findAllOpenByExam(Long examId) {


        Collection<Exercise> exercises = exerciseRepository.findByStatusAndExamId("O", examId);
        return exercises;
        
    }
    
    @Override
    public Exercise findOne(Long id) {
        logger.info("> findOne id:{}", id);

        Exercise exercise = exerciseRepository.findOne(id);

        logger.info("< findOne id:{}", id);
        return exercise;
    }
    
    @Override
    @Transactional(
            propagation = Propagation.REQUIRED,
            readOnly = false)
    public Exercise delegate(Exercise exercise, Examiner examiner) {
        
    	logger.info("> update id:{}", exercise.getId());


        // Ensure the entity object to be updated exists in the repository to
        // prevent the default behavior of save() which will persist a new
        // entity if the entity matching the id does not exist
        Exercise exerciseToUpdate = findOne(exercise.getId());
        if (exerciseToUpdate == null) {
            // Cannot update Greeting that hasn't been persisted
            logger.error(
                    "Attempted to update a Greeting, but the entity does not exist.");
            throw new NoResultException("Requested entity not found.");
        }
        
        exercise.setExaminer(examiner);

        //exerciseToUpdate.setText(exercise.getText());
        Exercise updatedExercise = exerciseRepository.save(exercise);

        logger.info("< update id:{}", exercise.getId());
        return updatedExercise;
    }
	
		@Override
	public Collection<Submission> getSubmissionsByExercise(Long exerciseID) {
    	logger.info("> getSubmissionsByExercise id:{}", exerciseID);
    	Collection<Submission> submissions = submissionRepository.getSubmissionsByExercise(exerciseID);
        logger.info("< getSubmissionsByExercise id:{}", exerciseID);
		return submissions;
	}
    

}
