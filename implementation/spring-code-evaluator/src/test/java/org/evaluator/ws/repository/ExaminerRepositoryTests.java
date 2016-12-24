package org.evaluator.ws.repository;

import java.util.Collection;

import org.evaluator.ws.AbstractTest;
import org.evaluator.ws.model.Examiner;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

/**
 * Unit tests for the ExaminerRepository interface.
 * 
 * @author Manuel Zamith
 *
 */
@Transactional
public class ExaminerRepositoryTests extends AbstractTest {
	

	@Autowired
	private ExaminerRepository repository;
	
	@Test
	public void testFindByUsername() {

		String username = repository.findAll().get(0).getUsername();

		Examiner entity = repository.findByUsername(username);

		Assert.assertNotNull("failure - expected entity not null", entity);
		Assert.assertEquals("failure - expected username attribute match", username, entity.getUsername());

	}
	
	@Test
	public void testFindAll() {

		Collection<Examiner> entityList = repository.findAll();

		Assert.assertNotNull("failure - expected entity not null", entityList);

	}

}
