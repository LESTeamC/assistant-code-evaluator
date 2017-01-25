package org.evaluator.ws.repository;

import org.evaluator.ws.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
	
	Student findByUsername(String username);
}
