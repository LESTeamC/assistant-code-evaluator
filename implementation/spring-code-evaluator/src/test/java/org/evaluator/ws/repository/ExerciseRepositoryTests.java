package org.evaluator.ws.repository;

import java.util.Collection;
import java.util.List;

import javax.transaction.Transactional;

import org.evaluator.ws.AbstractTest;
import org.evaluator.ws.model.Examiner;
import org.evaluator.ws.model.Exercise;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

@Transactional
public class ExerciseRepositoryTests extends AbstractTest {
	
	@Autowired
	private ExerciseRepository repository;
	@Autowired
	private ExaminerRepository examinerRepository;
	
	@Test
	public void testFindAll() {
		
		List<Exercise> entity = repository.findAll();
		
		Assert.assertNotNull("expected entity not null", entity);
		
	}
	
	
	@Test
	public void testFindOne() {
		
		Exercise exercise = repository.findOne(1L);
		
		Assert.assertNotNull("expected entity null", exercise);
		
	}
	
	@Test
	public void testSave() {
		
		Exercise exercise = repository.findOne(1L);
		Examiner examiner = examinerRepository.findOne(1L);
		
		exercise.setExaminer(examiner);
		
		repository.save(exercise);
		
		Assert.assertEquals("expected examiner to match", repository.findOne(1L).getExaminer(), exercise.getExaminer());
		
	}
	
	@Test
	public void testSaveNull() {
		
		Exercise exercise = repository.findOne(1L);
		
		exercise.setExaminer(null);
		
		repository.save(exercise);
		
		Assert.assertEquals("expected examiner to match", null, exercise.getExaminer());
		
	}
	
	@Test
	public void testFindByStatus() {
		
		List<Exercise> exercises = repository.findByStatus("O");
		
		boolean hasClosed = false;
		for (int i = 0; i < exercises.size(); i++){
			if (!exercises.get(i).getStatus().equals("O")){hasClosed = true; break;}
		}
		
		Assert.assertEquals("to only have open", hasClosed, false);
	
	}
	
	@Test
	public void testDeleteExaminerExamNull() {
		
		Examiner examiner = examinerRepository.findByName("Nuno Flores");
		examinerRepository.delete(examiner);
		
		List<Exercise> entity = repository.findAll();
		
		Assert.assertNull("expected entity null", entity.get(2).getExaminer());
		
	}


}
