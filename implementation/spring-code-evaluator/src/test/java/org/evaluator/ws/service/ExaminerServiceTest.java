package org.evaluator.ws.service;

import javax.transaction.Transactional;

import org.evaluator.ws.AbstractTest;
import org.evaluator.ws.model.Account;
import org.evaluator.ws.model.Examiner;
import org.evaluator.ws.util.RequestContext;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

@Transactional
public class ExaminerServiceTest extends AbstractTest {
	
    @Autowired
    private ExaminerService service;
    
    @Before
    public void setUp() {	
    	//setting up WS thread
    	RequestContext.setUsername("user");
    }
    
    @Test
    public void testFindOne(){
    	
    	Examiner examiner = service.findOne(1L);
    	
    	Assert.assertTrue(examiner.getId() == 1L);
    	
    }
    
    @Test
    public void delete(){
    	
    	service.delete(2L);
   
    	Assert.assertNull(service.findOne(2L));
    }
    
    @Test
    public void create(){
    	    	
    	Examiner examiner = new Examiner();
    	examiner.setAccount(new Account());
    	examiner.getAccount().setPassword("123");
    	examiner.setEmail("test@email.com");
    	examiner.setUsername("test");
    	examiner.setName("test name");
    	
    	Examiner createdExaminer = service.create(examiner);
    	
    	Assert.assertNotNull(createdExaminer.getId());
    	Assert.assertTrue(createdExaminer.getName() == examiner.getName());
    	Assert.assertNotEquals(createdExaminer.getAccount().getPassword(), "123");
    	
    }

}
