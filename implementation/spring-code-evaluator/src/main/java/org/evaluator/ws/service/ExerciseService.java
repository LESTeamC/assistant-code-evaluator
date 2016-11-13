package org.evaluator.ws.service;

import java.util.Collection;

import org.evaluator.ws.model.Examiner;
import org.evaluator.ws.model.Exercise;

public interface ExerciseService {
	
	public Collection<Exercise> findAll();
		
	Exercise findOne(Long id);
	
	Collection <Exercise> findAllOpen();
	
	Exercise delegate(Exercise exercise, Examiner examiner);
	
	Collection<Submission> getSubmissionsByExercise(Long exerciseID);


}
