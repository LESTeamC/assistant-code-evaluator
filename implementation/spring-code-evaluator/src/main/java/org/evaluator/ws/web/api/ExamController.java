package org.evaluator.ws.web.api;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.evaluator.ws.model.Exam;
import org.evaluator.ws.model.Exercise;
import org.evaluator.ws.model.ExerciseDTO;
import org.evaluator.ws.service.ExamService;
import org.hibernate.JDBCException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ExamController extends BaseController {

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private ExamService examService;
	
    @RequestMapping(
            value = "/admin/exam/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Exam> getExam(@PathVariable("id") Long id) {
        logger.info("> getExam id:{}", id);

        Exam exam = examService.findById(id);
        if (exam == null) {
            return new ResponseEntity<Exam>(HttpStatus.NOT_FOUND);
        }

        logger.info("< getExam id:{}", id);
        return new ResponseEntity<Exam>(exam, HttpStatus.OK);
    }
    
    @RequestMapping(
            value = "/api/exam-by-submission/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Exam> getExamBySubmission(@PathVariable("id") Long id) {
        logger.info("> getExamBySubmission id:{}", id);

        Exam exam = examService.findBySubmissionId(id);
        if (exam == null) {
            return new ResponseEntity<Exam>(HttpStatus.NOT_FOUND);
        }

        logger.info("< getExamBySubmission id:{}", id);
        return new ResponseEntity<Exam>(exam, HttpStatus.OK);
    }
    
    @RequestMapping(
            value = "/admin/exam",
            method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Exam> createExam(
            @RequestBody Exam exam) {
        logger.info("> createExam");
        
        try{
        	Exam savedExam = examService.create(exam);
        	logger.info("< createExam");
        	
            return new ResponseEntity<Exam>(savedExam, HttpStatus.CREATED);
            
        }catch(DataIntegrityViolationException SQLe){
        	
        	//Check for duplicate Key in Request (duplicate name)
        	
        	//From mySQL Docs:
        	//Error: 1022 SQLSTATE: 23000 (ER_DUP_KEY)
        	//Message: Can't write; duplicate key in table '%s'
        	        	
        	if (SQLe.getCause() instanceof JDBCException){
        	
	            if (((JDBCException) SQLe.getCause()).getSQLException().getSQLState().equals("23000") ) {
	        		return new ResponseEntity<Exam>(HttpStatus.CONFLICT);
	        	}else return new ResponseEntity<Exam>(HttpStatus.BAD_REQUEST);
        	}else{
        		return new ResponseEntity<Exam>(HttpStatus.BAD_REQUEST);
        	}
        	
        }catch(Exception e){
        	logger.info("> createExam");
        	logger.error(e.getMessage());
        	return new ResponseEntity<Exam>(HttpStatus.BAD_REQUEST);
        }
        

       
    }

		@RequestMapping(value = "/api/exams_by_examiner/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Exam>> getExamByExaminer(@PathVariable("id") Long examinerID) {
		logger.info("> getExamByExaminer id:{}", examinerID);
		
		ArrayList<Exam> exams =  (ArrayList) examService.findByExaminer(examinerID);
		if (exams == null) {
			return new ResponseEntity<List<Exam>>(HttpStatus.NOT_FOUND);
		}

		logger.info("< getExamByExaminer id:{}", examinerID);
		return new ResponseEntity<List<Exam>>(exams, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/api/exercises_by_examiner/{usernameID}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<ExerciseDTO>> getExercisesByExaminer(@PathVariable("usernameID") String usernameID) {
		logger.info("> getExercisesByExaminer id:{}", usernameID);
		
		Collection<ExerciseDTO> exercises = examService.findExamsByExaminer(usernameID);
		if (exercises == null) {
			return new ResponseEntity<Collection<ExerciseDTO>>(HttpStatus.NOT_FOUND);
		}

		logger.info("< getExercisesByExaminer id:{}", usernameID);
		return new ResponseEntity<Collection<ExerciseDTO>>(exercises, HttpStatus.OK);
	}	
	
}
