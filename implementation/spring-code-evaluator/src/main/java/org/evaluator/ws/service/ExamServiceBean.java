package org.evaluator.ws.service;

import java.util.Collection;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityExistsException;

import org.evaluator.ws.model.Exam;
import org.evaluator.ws.model.Exercise;
import org.evaluator.ws.model.Student;
import org.evaluator.ws.repository.ExamRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.metrics.CounterService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(
        propagation = Propagation.SUPPORTS,
        readOnly = true)
public class ExamServiceBean implements ExamService {

    /**
     * The Logger for this class.
     */
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    
    /**
     * The Spring Data repository for Exam entities.
     */
    @Autowired
    private ExamRepository examRepository;
    
    @Autowired
    private StudentService studentService;
    
    /**
     * The <code>CounterService</code> captures metrics for Spring Actuator.
     */
    @Autowired
    private CounterService counterService;
    
    
    @Override
    public Exam findById(Long id) {
        logger.info("> findById");
        Exam exam = examRepository.findById(id);

        logger.info("< findById");
        return exam;
    }
    
    @Override
    public Collection<Exam> findAll(){
    	logger.info("> findAll");
        Collection<Exam> exams = examRepository.findAll();

        logger.info("< findById");
        return exams;
    }
    
    @Override
    @Transactional(
            propagation = Propagation.REQUIRED,
            readOnly = false)
    public Exam create(Exam exam) {
        logger.info("> createExam");

        counterService.increment("method.invoked.examServiceBean.create");

        // Ensure the entity object to be created does NOT exist in the
        // repository. Prevent the default behavior of save() which will update
        // an existing entity if the entity matching the supplied id exists.
        if (exam.getId() != null) {
            // Cannot create Exam with specified ID value
            logger.error(
                    "Attempted to create a Exam, but id attribute was not null.");
            throw new EntityExistsException(
                    "The id attribute must be null to persist a new entity.");
        }
        
        //Execute Student Service.
        
        if(exam.getStudents() != null) {
        
	        List<Student> students = studentService.createList(exam.getStudents());
	        exam.setStudents(students);
        }
        
        // Calculate number of Questions
        Set<Exercise> exercisesSet = exam.getExercises();
        
        if (exercisesSet != null){
        	exam.setNquestions(exercisesSet.size());
        	
        	for(Exercise e: exercisesSet){
        		e.setExamname(exam.getName());
        	}
        }
        
        // Status, progress are set by default values when exam is created;

        Exam savedExam = examRepository.save(exam);

        logger.info("< createExam");
        return savedExam;
    }
        
	@Override
	public Collection<Exam> findByExaminer(Long examinerID) {
		logger.info("> findByExaminer");
		Collection<Exam> exams = examRepository.findExamByExaminer(examinerID);
		
		logger.info("< findByExaminer");
		return exams;
	}
	
	
	@Override
	public Collection<Exercise> findExercisesByExaminer(Long examinerID) {
		logger.info("> findByExaminer");
		Collection<Exercise> exams = examRepository.findExercisesByExaminer(examinerID);
		
		logger.info("< findByExaminer");
		return exams;
	}
}
