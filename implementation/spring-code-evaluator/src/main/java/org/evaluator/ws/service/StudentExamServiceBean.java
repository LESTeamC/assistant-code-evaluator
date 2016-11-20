package org.evaluator.ws.service;

import java.util.ArrayList;
import java.util.Collection;

import org.evaluator.ws.model.Student;
import org.evaluator.ws.model.StudentExam;
import org.evaluator.ws.repository.ExamRepository;
import org.evaluator.ws.repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(
        propagation = Propagation.SUPPORTS,
        readOnly = true)
public class StudentExamServiceBean implements StudentExamService {
	
    @Autowired
    private ExamRepository examRepository;
    
    @Autowired
    private SubmissionRepository submissionRepository;
	
	public Collection<StudentExam> buildGrades(Long examId){
		
		Collection<Student> students = examRepository.findOne(examId).getStudents();
		Collection<StudentExam> grades = new ArrayList<StudentExam>();
		
		for (Student student : students){
			
			//1. Collect student's submissions from SubmissionRepository
			//2. Create StudentExamObject with exam name and student name
			//3. for each submission
				//3.1. Calculate grade for Exercise
				//3.2  Add exercise - grade entry to HashMap
			//4. Calculate final grade
			//5. Add entry to grades List
		}
		
		return null;
	}

}
