package org.evaluator.ws.service;

import java.util.List;

import org.evaluator.ws.model.Student;

public interface StudentService {
	
	Student findByUsername(String username);
	
	Student create(Student student);
	
	List<Student> createList(List<Student> students);
}
