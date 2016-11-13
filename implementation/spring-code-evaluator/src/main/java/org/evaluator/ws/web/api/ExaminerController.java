package org.evaluator.ws.web.api;

import java.util.Collection;

import org.evaluator.ws.model.Examiner;
import org.evaluator.ws.service.ExaminerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
       

}
