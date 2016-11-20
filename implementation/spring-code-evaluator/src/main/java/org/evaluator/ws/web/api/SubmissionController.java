package org.evaluator.ws.web.api;

import org.evaluator.ws.model.Exam;
import org.evaluator.ws.model.Greeting;
import org.evaluator.ws.model.Submission;
import org.evaluator.ws.service.SubmissionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SubmissionController {
	

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private SubmissionService submissionService;
	
    @RequestMapping(
            value = "/api/submission/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Submission> getSubmission(@PathVariable("id") Long id) {
        logger.info("> getSubmission id:{}", id);

        Submission submission = submissionService.findOne(id);
        if (submission == null) {
            return new ResponseEntity<Submission>(HttpStatus.NOT_FOUND);
        }

        logger.info("< getSubmission id:{}", id);
        return new ResponseEntity<Submission>(submission, HttpStatus.OK);
    }
    
    @RequestMapping(
            value = "/api/submission/{id}",
            method = RequestMethod.PUT,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Submission> updateSubmission(
            @RequestBody Submission submission) {
        logger.info("> updateSubmission id:{}", submission.getId());

        Submission updatedSubmission = submissionService.update(submission);
        if (updatedSubmission == null) {
            return new ResponseEntity<Submission>(
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

        logger.info("< updateSubmission id:{}", submission.getId());
        return new ResponseEntity<Submission>(updatedSubmission, HttpStatus.OK);
    }
	
	

}
