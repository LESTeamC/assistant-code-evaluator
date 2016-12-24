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
				
		List<Submission> entity = repository.findAll();
		
		Assert.assertNotNull(entity);
		
	}
	
	@Test
	public void testFindByExamIdOrderByStudentId() {
				
		List<Submission> entity = repository.findByExamIdOrderByStudentId(1L);
		
		boolean ordered = true;
		
		if (entity.size() > 1){
			for (int i = 1; i < entity.size(); i++){
				if (entity.get(i - 1).getStudent().getId() > entity.get(i).getStudent().getId()){
					ordered = false;
					break;
				}
			}
		}
		Assert.assertTrue(ordered);
		
	}
}
