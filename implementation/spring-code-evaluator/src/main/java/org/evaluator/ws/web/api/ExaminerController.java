package org.evaluator.ws.web.api;

import java.util.Collection;

import org.evaluator.ws.model.Exam;
import org.evaluator.ws.model.Examiner;
import org.evaluator.ws.service.ExaminerService;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ExaminerController extends BaseController {
	

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private ExaminerService examinerService;
	
	@RequestMapping(
			value = "/api/examiner",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Examiner> getExaminer(@RequestParam(value="username") String username){
		
		logger.info("> getExaminer");
		
		Examiner examiner = examinerService.findByUsername(username);
		return new ResponseEntity<Examiner>(examiner, HttpStatus.ACCEPTED);
	}
	
	@RequestMapping(
			value = "/admin/examiners",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<Examiner>> getExaminers(){
		
		logger.info("> getExaminers");
		
		Collection<Examiner> examiners = examinerService.findAll();

		return new ResponseEntity<Collection<Examiner>>(examiners, HttpStatus.OK);
	}
	
    @RequestMapping(
            value = "/admin/examiner",
            method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Examiner> createExaminer(
            @RequestBody Examiner examiner) {
        logger.info("> createExaminer");
        
        try{
        	Examiner savedExaminer = examinerService.create(examiner);
        	logger.info("< createExaminer");
        	
            return new ResponseEntity<Examiner>(savedExaminer, HttpStatus.CREATED);
            
        }catch(DataIntegrityViolationException SQLe){
        	
        	//Check for duplicate Key in Request (duplicate name)
        	
        	//From mySQL Docs:
        	//Error: 1022 SQLSTATE: 23000 (ER_DUP_KEY)
        	//Message: Can't write; duplicate key in table '%s'
        	        	
        	if (SQLe.getCause() instanceof JDBCException){
        	
	            if (((JDBCException) SQLe.getCause()).getSQLException().getSQLState().equals("23000") ) {
	        		return new ResponseEntity<Examiner>(HttpStatus.CONFLICT);
	        	}else return new ResponseEntity<Examiner>(HttpStatus.BAD_REQUEST);
        	}else{
        		return new ResponseEntity<Examiner>(HttpStatus.BAD_REQUEST);
        	}
        	
        }catch(Exception e){
        	logger.info("> createExaminer");
        	logger.error(e.getMessage());
        	return new ResponseEntity<Examiner>(HttpStatus.BAD_REQUEST);
        }
        

       
    }
    
    @RequestMapping(
            value = "/admin/examiner/{id}",
            method = RequestMethod.DELETE)
    public ResponseEntity<Exam> deleteExaminer(
            @PathVariable("id") Long id) {
        logger.info("> deleteExaminer id:{}", id);

        examinerService.delete(id);

        logger.info("< deleteExaminer id:{}", id);
        return new ResponseEntity<Exam>(HttpStatus.NO_CONTENT);
    }
       

}
