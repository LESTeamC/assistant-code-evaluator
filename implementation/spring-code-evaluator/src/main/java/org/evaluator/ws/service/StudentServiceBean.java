package org.evaluator.ws.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.EntityExistsException;

import org.evaluator.ws.model.Student;
import org.evaluator.ws.repository.StudentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(
        propagation = Propagation.SUPPORTS,
        readOnly = true)
public class StudentServiceBean implements StudentService {
	
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    /**
     * The Spring Data repository for Student entities.
     */
    @Autowired
    private StudentRepository studentRepository;

	@Override
	public Student findByUsername(String username) {
        logger.info("> findByUsername username:{}", username);

        Student student = studentRepository.findByUsername(username);

        logger.info("< findByUsername username:{}", username);
        return student;
	}

	@Override
	public Student create(Student student) {
        logger.info("> create");

        // Ensure the entity object to be created does NOT exist in the
        // repository. Prevent the default behavior of save() which will update
        // an existing entity if the entity matching the supplied id exists.
        if (student.getId() != null) {
            // Cannot create Greeting with specified ID value
            logger.error(
                    "Attempted to create a Greeting, but id attribute was not null.");
            throw new EntityExistsException(
                    "The id attribute must be null to persist a new entity.");
        }

        Student savedStudent = studentRepository.save(student);

        logger.info("< create");
        return savedStudent;
	}
	
	public List<Student> createList(List<Student> students){
		
		List<Student> createdStudents = new ArrayList<Student>();
		
		for (int i = 0; i < students.size(); i++){
			
			Student currentStudent = students.get(i);
			
			Student s = studentRepository.findByUsername(currentStudent.getUsername());
			if (s == null){
				createdStudents.add(studentRepository.save(currentStudent));
			}else{
				createdStudents.add(s);
			}

		}
		return createdStudents;
	}

}
