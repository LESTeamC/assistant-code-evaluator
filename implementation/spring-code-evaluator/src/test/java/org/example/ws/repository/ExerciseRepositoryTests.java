package org.example.ws.repository;

import java.util.Collection;
import java.util.List;

import javax.transaction.Transactional;

import org.evaluator.ws.model.Account;
import org.evaluator.ws.model.Examiner;
import org.evaluator.ws.model.Exercise;
import org.evaluator.ws.repository.ExaminerRepository;
import org.evaluator.ws.repository.ExerciseRepository;
import org.example.ws.AbstractTest;
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
	public void testFindExaminer() {
		
		List<Exercise> entity = repository.findAll();
		
		Assert.assertNotNull("expected entity not null", entity.get(0).getExaminer());
		
	}
	
	@Test
	public void testFindAccount() {
		
		List<Exercise> entity = repository.findAll();
		Account account = entity.get(0).getExaminer().getAccount();
		
		Assert.assertNotNull("expected entity not null", entity.get(0).getExaminer().getAccount());
		
	}
	
	@Test
	public void testDeleteExaminerExamNull() {
		
		Examiner examiner = examinerRepository.findByName("Nuno Flores");
		examinerRepository.delete(examiner);
		
		List<Exercise> entity = repository.findAll();
		
		Assert.assertNull("expected entity null", entity.get(2).getExaminer());
		
	}


}
