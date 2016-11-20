package org.evaluator.ws.service;

import java.util.Collection;

import org.evaluator.ws.model.StudentExam;

public interface StudentExamService {
	
	Collection<StudentExam> buildGrades(Long examId);

}
