package org.evaluator.ws.service;

import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.evaluator.ws.AbstractTest;
import org.evaluator.ws.model.Exam;
import org.evaluator.ws.model.Exercise;
import org.evaluator.ws.model.ExerciseDTO;
import org.evaluator.ws.util.RequestContext;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public class ExamServiceTest extends AbstractTest {
	
    @Autowired
    private ExamService service;

    @Before
    public void setUp() {
    	
    	//setting up WS thread
    	RequestContext.setUsername("user");
    	
        
    }
	
    @Test
    public void testCreate() {
		
		Exam entity = new Exam();
		Exercise exerciseOne = new Exercise();
		Exercise exerciseTwo = new Exercise();
		
    	//Building a TestSet
		//building a simple exam with the mandatory fields. All other fields should be defined by the service.
		entity.setDate(new Date());
		entity.setLanguage("Java");
		entity.setName("Functional Programming");
		entity.setCourse("MIEIC");
		entity.setDegree("FP1");
		
		//build a simple exercise
		exerciseOne.setExam(entity);
		exerciseOne.setName("Exercise One");
		exerciseOne.setQuestion("Test question");
		exerciseOne.setWeight(50);
		
		//build a simple exercise
		exerciseTwo.setExam(entity);
		exerciseTwo.setName("Exercise Two");
		exerciseTwo.setQuestion("Test question Two");
		exerciseTwo.setWeight(50);
		
		Set<Exercise> exercises = new HashSet<Exercise>(Arrays.asList(exerciseOne, exerciseTwo));
		
		entity.setExercises(exercises);

        Exam createdEntity = service.create(entity);

        Assert.assertNotNull("failure - expected not null", createdEntity);
        Assert.assertNotNull("failure - expected id attribute not null",
                createdEntity.getId());
        Assert.assertEquals("failure - expected Name attribute match", "Functional Programming",
                createdEntity.getName());
        Assert.assertEquals("failure - expected nquestions attribute match", 2,
                createdEntity.getNquestions());

    }
	
    @Test
    public void findByExaminer(){
    	Long examinerID = Long.parseLong("1");
    	Collection<Exam> collection = service.findByExaminer(examinerID);
    	
        Assert.assertNotNull("failure - expected not null", collection);
    }
    
    @Test
    public void findExamsByExaminer(){
    	String username = "up20165544";
    	Collection<ExerciseDTO> collection = service.findExamsByExaminer(username);
    	
        Assert.assertNotNull("failure - expected not null", collection);
    }

}
