package org.evaluator.ws.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.evaluator.ws.AbstractTest;
import org.evaluator.ws.model.Student;
import org.evaluator.ws.model.StudentExam;
import org.evaluator.ws.util.RequestContext;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public class StudentExamServiceTest extends AbstractTest {
	
    @Autowired
    private StudentExamService service;

    @Before
    public void setUp() {
    	RequestContext.setUsername("user");
        
    }
    
    @Test
    public void getGradesTest() {

    	Collection<StudentExam> s = service.buildGrades(2L);

        Assert.assertNotNull("failure - expected not null", s);


    }

}
