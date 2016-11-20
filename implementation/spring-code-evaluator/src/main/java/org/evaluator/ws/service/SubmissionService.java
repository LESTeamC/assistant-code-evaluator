package org.evaluator.ws.service;

import java.util.Collection;

import org.evaluator.ws.model.Submission;

public interface SubmissionService {
	
		Submission findOne(Long id);
		
		Collection<Submission> findOpenByExercise(Long exerciseId);
		
		Submission changeComment(Long submissionId, String comment);
		
		Submission update(Submission submission);

}
