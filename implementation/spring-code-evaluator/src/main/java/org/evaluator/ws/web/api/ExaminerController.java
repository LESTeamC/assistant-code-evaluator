package org.evaluator.ws.web.api;

import java.util.Collection;
import javax.mail.MessagingException;
import org.evaluator.ws.model.Exam;
import org.evaluator.ws.model.Examiner;
import org.evaluator.ws.service.EmailService;
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

/**
 * The ExaminerController class is a RESTful web service controller.
 * It handles requests related to the Examiner Model Entity class.
 * 
 * @author Manuel Zamith
 * @author Ricardo Caldas
 *
 */
@RestController
public class ExaminerController extends BaseController {
	
	private Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private ExaminerService examinerService;
	
	@Autowired
	private EmailService emailService;
	
    /**
     * Examiner Home (Header)
     * US 12.1 - Edit Examiner
     * 
     * Web service endpoint to fetch an Examiner entity with a given username. 
     * 
     * @param username The examiner username, through URL parameter
     * @return A ResponseEntity containing the Examiner with the given username.
     */
	@RequestMapping(
			value = "/api/examiner",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Examiner> getExaminer(@RequestParam(value="username") String username){
		
		logger.info("> getExaminer");
		
		Examiner examiner = examinerService.findByUsername(username);
		return new ResponseEntity<Examiner>(examiner, HttpStatus.ACCEPTED);
	}
	
    /**
     * US 9.2 - Delegate Exercise (list of available Examiners)
     * US 12.4 - View Examiners
     * 
     * Web service endpoint to fetch an Examiner entity with a given username. 
     * 
     * @return A ResponseEntity containing a Collection of all the Examiners in the platform
     */
	@RequestMapping(
			value = "/admin/examiners",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<Examiner>> getExaminers(){
		
		logger.info("> getExaminers");
		
		Collection<Examiner> examiners = examinerService.findAll();

		return new ResponseEntity<Collection<Examiner>>(examiners, HttpStatus.OK);
	}
	
    /**
     * US 7.1 - Create Examiner
     * 
     * Web service endpoint to persist an Examiner entity
     * 
     * @param examiner The examiner entity to persist, through Body of request.
     * @return A ResponseEntity containing the Examiner that was created with ID.
     */
    @RequestMapping(
            value = "/admin/examiner",
            method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Examiner> createExaminer(
            @RequestBody Examiner examiner) {
        logger.info("> createExaminer");
        
        try{
        	
        	//Save the password, before it is enconded, to send in the Body of the Email
        	String pw = examiner.getAccount().getPassword();
        	Examiner savedExaminer = examinerService.create(examiner);
        	logger.info("< createExaminer");
			
        	emailService.sendAsync(examiner.getEmail(), examiner.getUsername(), pw);
       
            return new ResponseEntity<Examiner>(savedExaminer, HttpStatus.CREATED);
            
        }catch(DataIntegrityViolationException SQLe){
        	
        	//Check for duplicate Key in Request (duplicate name)
        	
        	//From mySQL Docs:
        	//Error: 1022 SQLSTATE: 23000 (ER_DUP_KEY)
        	//Message: Can't write; duplicate key in table '%s'
        	        	
        	if (SQLe.getCause() instanceof JDBCException){
        	
	            if (((JDBCException) SQLe.getCause()).getSQLException().getSQLState().equals("23000") ) {
	            	
	            	//Return CONFLIC http status if there is already an examiner with the same username
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
    
    /**
     * US 12.5 - Delete Examier
     * 
     * Web service endpoint to delete an Examiner entity
     * 
     * @param id The examiner ID for which to delete the Examiner
     */
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
	
    /**
     * US 12.1 - Edit Examiner
     * 
     * Web service endpoint to update an Examiner entity
     * 
     * @param examiner The examiner entity to update, through Body of request.
     * @return A ResponseEntity containing the Examiner that was updated.
     */
    @RequestMapping(
            value = "/admin/examiner/{id}",
            method = RequestMethod.PUT,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Examiner> updateExaminer(
            @RequestBody Examiner examiner) {
        logger.info("> updateExaminer");
        
        try{
        	
        	//Save original password before it is encrypted.
        	String pw = examiner.getAccount().getPassword();
        	
        	Examiner savedExaminer = examinerService.update(examiner);
        	logger.info("< updateExaminer");
		        	
        	//The platform only notifies the examiner by email if the Password is updated
        	//Otherwise, there is no need to send E-mail.
        	//In this case, if the password has not been updated, the sent examiner will have the previous encrypted PW.
        	if(!pw.equals(savedExaminer.getAccount().getPassword())){
            	emailService.sendAsync(examiner.getEmail(), examiner.getUsername(), pw);
        	}
        	
            return new ResponseEntity<Examiner>(savedExaminer, HttpStatus.OK);
            
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
}
