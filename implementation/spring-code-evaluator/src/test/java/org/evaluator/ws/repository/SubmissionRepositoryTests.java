package org.evaluator.ws.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.evaluator.ws.model.Submission;
import org.evaluator.ws.AbstractTest;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

@Transactional
public class SubmissionRepositoryTests extends AbstractTest {

	@Autowired
	private SubmissionRepository repository;
	
	@Test
	public void testFindAll() {
		
		Submission s = repository.findOne(1L);
		
		List<Submission> entity = repository.findAll();
		
		Assert.assertTrue(entity.size() > 3);
		
	}
}
