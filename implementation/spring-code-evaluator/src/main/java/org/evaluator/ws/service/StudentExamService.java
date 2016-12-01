package org.evaluator.ws.service;

import java.util.List;

import org.evaluator.ws.model.StudentExam;

public interface StudentExamService {
	
	List<StudentExam> buildGrades(Long examId);

}
