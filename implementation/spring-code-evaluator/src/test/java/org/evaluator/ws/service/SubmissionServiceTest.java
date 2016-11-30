/*package org.evaluator.ws.service;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.evaluator.ws.AbstractTest;
import org.evaluator.ws.model.Exam;
import org.evaluator.ws.model.Exercise;
import org.evaluator.ws.model.Student;
import org.evaluator.ws.model.Submission;
import org.evaluator.ws.util.RequestContext;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public class SubmissionServiceTest extends AbstractTest {
	
    @Autowired
    private SubmissionService service;

    @Before
    public void setUp() {
    	RequestContext.setUsername("user");
        
    }
    
    private Exam buildExam(){
    	
    	Exam exam = new Exam("test", new Date(), "test", "test", "test");
    	Exercise exercise = new Exercise("test", "test", 100);
    	
    	exercise.setExam(exam);
    	exercise.setExamname(exam.getName());
    	exercise.setNsubmissions(1);
    	
    	Set<Exercise> exercises = new HashSet<Exercise>();
    	exercises.add(exercise);
    	
    	exam.setNquestions(exercises.size());
    	exam.setExercises(exercises);
    	
    	return exam;
    }
    
   
    public void updateSubmissionTest(){
    	
    	Exam exam = this.buildExam();
    	Submission submission = service.findOne(1L);
    	
    	submission.setGrade(100);
    	
    	service.update(submission);
    	
    }
	

}
*/