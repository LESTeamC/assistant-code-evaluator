package org.evaluator.ws.repository;

import org.evaluator.ws.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * The StudentRepository interface is a Spring Data JPA data repository for Student
 * entities.
 * 
 * @author Manuel Zamith
 */
public interface StudentRepository extends JpaRepository<Student, Long> {
	
	/**
	 * Queries the repository for a student with the given username
	 * 
	 * <pre>
     * SELECT a FROM Student a WHERE a.username = ?1
     * </pre>
     * 
	 * @param username a Username attribute value to query the repository
	 * @return a Student Entity model object
	 */
	Student findByUsername(String username);
}
