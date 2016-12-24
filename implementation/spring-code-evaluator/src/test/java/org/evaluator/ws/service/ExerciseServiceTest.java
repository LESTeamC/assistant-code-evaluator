package org.evaluator.ws.service;

import java.util.Collection;

import javax.transaction.Transactional;

import org.evaluator.ws.AbstractTest;
import org.evaluator.ws.model.Examiner;
import org.evaluator.ws.model.Exercise;
import org.evaluator.ws.util.RequestContext;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

@Transactional
public class ExerciseServiceTest extends AbstractTest {
	
    @Autowired
    private ExerciseService service;
    
    @Autowired
    private ExaminerService examinerService;

    @Before
    public void setUp() {
    	RequestContext.setUsername("user");
        
    }
    
    @Test
    public void testFindAll(){
    	
    	Collection<Exercise> exerises= service.findAll();
    	
    	Assert.assertNotNull(exerises);
    	
    }
    
    @Test
    public void testFindAllOpen(){
    	
    	Collection<Exercise> exercises= service.findAllOpen();
    	
    	boolean closed = false;
    	for (Exercise e : exercises){
    		if (e.getStatus().equals("C")){
    			closed = true;
    			break;
    		}
    	}
    	
    	Assert.assertFalse(closed);
    	
    }
    
    @Test
    public void testFindAllOpenByExam(){
    	
    	Collection<Exercise> exercises= service.findAllOpenByExam(1L);
    	
    	boolean closed = false;
    	for (Exercise e : exercises){
    		if (! (e.getStatus().equals("O") && e.getExam().getId().equals(1L))){
    			closed = true;
    			break;
    		}
    	}
    	
    	Assert.assertFalse(closed);
    	
    }
    
    
    @Test
    public void testDelegate(){
    	
    	Examiner examiner = examinerService.findOne(1L);
    	Exercise exercise = service.findOne(1L);
    	
    	Exercise delegatedExercise = service.delegate(exercise, examiner);
    	
    	Assert.assertEquals(examiner.getUsername(), delegatedExercise.getExaminer().getUsername());
    }
    
    @Test
    public void testUndelegate(){
    	
    	Examiner examiner = examinerService.findOne(1L);
    	Exercise exercise = service.findOne(1L);
    	
    	Exercise delegatedExercise = service.delegate(exercise, examiner);
    	Exercise undelegatedExercise = service.delegate(delegatedExercise, null);
    	
    	Assert.assertNull(undelegatedExercise.getExaminer());
    }

}
