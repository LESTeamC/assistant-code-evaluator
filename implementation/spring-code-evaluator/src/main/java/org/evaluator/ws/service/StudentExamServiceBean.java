package org.evaluator.ws.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.evaluator.ws.model.Student;
import org.evaluator.ws.model.StudentExam;
import org.evaluator.ws.model.Submission;
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
	
	public List<StudentExam> buildGrades(Long examId){
		
		List<Submission> submissions = submissionRepository.findByExamIdOrderByStudentId(examId);
		List<StudentExam> grades = new ArrayList<StudentExam>();
		
		// if (submissions.size() == 0) Throw and Exception!.
		
		//Variable for current student. The query is ordered by student for separation.
		Student currentStudent = submissions.get(0).getStudent();
		
		//The exam will always be the same
		String examName = examRepository.findOne(examId).getName();
		
		//Initialize variables 
		StudentExam studentExam = new StudentExam(examName, currentStudent.getUsername());
		double finalGrade = 0;
		
		for (Submission s: submissions){
			
			if (s.getStudent().getId() == currentStudent.getId()){
				
				if (s.getStatus().equals("O")){
					studentExam.addGrade(s.getExercise().getName(), -1);
				}else{
				
					studentExam.addGrade(s.getExercise().getName(), s.getGrade() * (20.0/100.0));
				}
				
				finalGrade += s.getGrade() * (20.0 / 100.0);
				studentExam.setFinalGrade(finalGrade);
			}else{
				
				// Add previous student grades to list
				grades.add(studentExam);
				
				currentStudent = s.getStudent();
				studentExam = new StudentExam(examName, currentStudent.getUsername());
				finalGrade = 0;
				
				if (s.getStatus().equals("O")){
					studentExam.addGrade(s.getExercise().getName(), -1);
				}else{
				
					studentExam.addGrade(s.getExercise().getName(), s.getGrade() * (20.0/100.0));
				}
				
				finalGrade += s.getGrade() * (20.0 / 100.0);
				studentExam.setFinalGrade(finalGrade);				
			}
		}
		
		grades.add(studentExam);
		
		return grades;
	}
	
}
