package org.evaluator.ws.service;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.evaluator.ws.AbstractTest;
import org.evaluator.ws.model.Exam;
import org.evaluator.ws.model.Exercise;
import org.evaluator.ws.model.Student;
import org.evaluator.ws.model.Submission;
import org.evaluator.ws.util.RequestContext;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public class SubmissionServiceTest extends AbstractTest {
	
    @Autowired
    private SubmissionService service;

    @Before
    public void setUp() {
    	RequestContext.setUsername("user");
        
    }
    
   @Test
   public void isOSLinuxT1(){
	
	   Boolean res = service.isOSLinux();
       Assert.assertNotNull("failure - expected not null", res);

   }
   
   @Test
   public void generateSubmissionT1(){
	   
	   Exam exam = new Exam("",new Date(), "","","Java");
	   String code = "";
	   Exercise exe = new Exercise();
	   Student stu = new Student();
	   
	   Submission sub = service.generateSubmission(exam, code, exe, stu);
	   
       Assert.assertNotNull("failure - expected not null", sub);
       Assert.assertNotNull("failure - expected not null", sub.getOutput());

   }

}
