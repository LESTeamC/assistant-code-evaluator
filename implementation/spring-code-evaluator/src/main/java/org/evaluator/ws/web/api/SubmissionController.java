package org.evaluator.ws.web.api;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * The SubmissionController class is a RESTful web service controller.
 * It handles requests related to the Submission Model Entity class.
 * 
 * @author Manuel Zamith
 */
@RestController
public class SubmissionController {
	

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private SubmissionService submissionService;
	
    /**
     * US 13.1, 13.2, 13.5 - Examiner Workstation
     * 
     * Web service endpoint to fetch a Submission by its ID
     * 
     * @param id ID of the Submission to fetch - PATH VARIABLE
     * @return A ResponseEntity containing a Submission
     */
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
    
    /**
     * US 13.7 - Save Evaluation
     * 
     * Web service endpoint to update a Submission - Evaluation Process
     * 
     * @param submission The submission to update, in the Body of request
     * @return A ResponseEntity the updated Submission
     */
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
    
    /**
     * US 13.3 - Insert Comment
     * 
     * Web service endpoint to update only the Submission Comment
     * 
     * @param id the ID of the submission to update
     * @param comment String containing the comment - URL Parameter
     * @return A ResponseEntity the updated Submission
     */
    @RequestMapping(
            value = "/api/submission-comment/{id}",
            method = RequestMethod.PUT,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Submission> updateSubmissionComment(@PathVariable("id") Long id,
    		@RequestParam(value="comment") String comment) {
        logger.info("> updateSubmissionComment id:{}", id);

        Submission updatedSubmission = submissionService.changeComment(id, comment);
        if (updatedSubmission == null) {
            return new ResponseEntity<Submission>(
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

        logger.info("< updateSubmissionComment id:{}", id);
        return new ResponseEntity<Submission>(updatedSubmission, HttpStatus.OK);
    }
	
	

}
