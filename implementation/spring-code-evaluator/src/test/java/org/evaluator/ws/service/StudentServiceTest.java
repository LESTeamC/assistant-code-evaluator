package org.evaluator.ws.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.evaluator.ws.AbstractTest;
import org.evaluator.ws.model.Greeting;
import org.evaluator.ws.model.Student;
import org.evaluator.ws.util.RequestContext;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public class StudentServiceTest extends AbstractTest {
	
    @Autowired
    private StudentService service;

    @Before
    public void setUp() {
    	RequestContext.setUsername("user");
        
    }
    
    @Test
    public void testCreate() {

        Student existingStudent = new Student();
        existingStudent.setName("Ana");
        existingStudent.setUsername("up20165544");
        Student newStudent = new Student();
        newStudent.setName("Henrique");
        newStudent.setUsername("usernamedeteste");
        newStudent.setId(100l);
        
        List<Student> listStudents = new ArrayList<Student>();
        listStudents.add(existingStudent);
        listStudents.add(newStudent);

        List<Student> listAfterTest = service.createList(listStudents);

        Assert.assertNotNull("failure - expected not null", listAfterTest);


    }
    
    @Test
    public void testFindByUsername() {

    	String username = "up20165544";
    	
        Student student = service.findByUsername(username);

        Assert.assertNotNull("failure - expected not null", student);
        Assert.assertNotNull("failure - expected not null", student.getId());


    }

}
