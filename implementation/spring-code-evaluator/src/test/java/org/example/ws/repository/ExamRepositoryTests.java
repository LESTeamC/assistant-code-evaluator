package org.example.ws.repository;

import java.util.Collection;

import javax.transaction.Transactional;

import org.evaluator.ws.model.Exam;
import org.evaluator.ws.repository.ExamRepository;
import org.example.ws.AbstractTest;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

@Transactional
public class ExamRepositoryTests extends AbstractTest {
	
	@Autowired
	private ExamRepository repository;
	
	@Test
	public void testFindAll() {

		Collection<Exam> entity = repository.findAll();

		Assert.assertNotNull("failure - expected entity not null", entity);
	}

}
