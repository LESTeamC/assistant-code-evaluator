package org.evaluator.ws.repository;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.evaluator.ws.model.Exam;
import org.evaluator.ws.model.Exercise;
import org.evaluator.ws.util.RequestContext;
import org.evaluator.ws.AbstractTest;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

@Transactional
public class ExamRepositoryTests extends AbstractTest {
	
	@Autowired
	private ExamRepository repository;
	
    @Before
    public void setUp() {
    	RequestContext.setUsername("user");
        
    }
	
	@Test
	public void testFindAll() {

		List<Exam> entity = repository.findAll();


		Assert.assertNotNull("failure - expected entity not null", entity);
	}
	
	@Test
	public void testSimpleCreate() {

		Exam entity = new Exam();
		
		entity.setDate(new Date());
		entity.setLanguage("Java");
		entity.setName("Functional Programming");
		entity.setCourse("MIEIC");
		entity.setDegree("FP1");
		
		Exam savedExam = repository.save(entity);

		Assert.assertNotNull("failure - expected entity not null", savedExam);
	}
	
	
	public void testCreateWithExercises() {

		Exam entity = new Exam();
		Exercise exercise = new Exercise();
		
		
		
		//building a simple exam with the mandatory fields. All other fields should be defined by the service.
		entity.setDate(new Date());
		entity.setLanguage("Java");
		entity.setName("Functional Programming");
		entity.setCourse("MIEIC");
		entity.setDegree("FP1");
		
		//build a simple exercise
		exercise.setExam(entity);
		exercise.setName("Exercise One");
		exercise.setQuestion("Test question");
		exercise.setWeight(100);
		
		Set<Exercise> exercises = new HashSet<Exercise>();
		exercises.add(exercise);
		
		entity.setExercises(exercises);
		
		Exam savedExam = repository.save(entity);

		Assert.assertNotNull("failure - expected entity not null", savedExam);
	}

}
