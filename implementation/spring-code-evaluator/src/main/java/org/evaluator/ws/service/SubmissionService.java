package org.evaluator.ws.service;

import java.io.InputStream;
import java.util.Collection;

import org.evaluator.ws.model.Submission;

public interface SubmissionService {
	
		Submission findOne(Long id);
		
		Collection<Submission> findOpenByExercise(Long exerciseId);
		
		Submission changeComment(Long submissionId, String comment);
		
		Submission update(Submission submission);
	
		void validateSubmissionFile(InputStream file, Long examID);
	
		void analyseCode(InputStream file, Long examID);
		
		boolean isOSLinux();

}
