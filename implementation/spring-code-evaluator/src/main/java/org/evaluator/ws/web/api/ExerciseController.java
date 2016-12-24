package org.evaluator.ws.web.api;

import java.util.Collection;

import org.evaluator.ws.model.Examiner;
import org.evaluator.ws.model.Exercise;
import org.evaluator.ws.model.Submission;
import org.evaluator.ws.service.ExaminerService;
import org.evaluator.ws.service.ExerciseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * The ExerciseController class is a RESTful web service controller.
 * It handles requests related to the Exercise Model Entity class.
 * 
 * @author Manuel Zamith
 */
@RestController
public class ExerciseController extends BaseController {
	
	private Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private ExerciseService exerciseService;
	
	@Autowired
	private ExaminerService examinerService;
	
    /**
     * NOT USED
     * 
     * Web service endpoint to fetch all the Exercises in the Platform
     * 
     * @return A ResponseEntity containing a Collection of all exercises created in the platform
     */
	@RequestMapping(
			value = "/admin/exercises",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<Exercise>> getExercises(){
		
		logger.info("> getExercises");
		
		Collection<Exercise> exercises = exerciseService.findAll();

		return new ResponseEntity<Collection<Exercise>>(exercises, HttpStatus.OK);
	}
	
    /**
     * US 9.1 - Delegate Exercises
     * 
     * Web service endpoint to fetch all Exercises that have Status Open (O)
     * 
     * @return A ResponseEntity containing a Collection of all Open Exercises
     */
	@RequestMapping(
			value = "/admin/openexercises",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<Exercise>> getOpenExercises(){
		
		logger.info("> getOpenExercises");
		
		Collection<Exercise> exercises = exerciseService.findAllOpen();

		return new ResponseEntity<Collection<Exercise>>(exercises, HttpStatus.OK);
	}
	
    /**
     * US 9.2 - Delegate Exercise
     * 
     * Web service endpoint to update a single Exercise entity - DELEGATION. The HTTP request
     * body is expected to contain an Exercise object in JSON format. The
     * Exercise is updated in the data repository.
     * 
     * If updated successfully, the persisted Exercise is returned as JSON with
     * HTTP status 200.
     * 
     * @param exerciseId The Exercise object to be updated. - PATH VARIABLE
     * @param examinerId The Examiner object for delegation - URL PARAMETER
     * @return A ResponseEntity containing a single Exercise object, if updated
     *         successfully, and a HTTP status code as described in the method
     *         comment.
     */
    @RequestMapping(
            value = "/admin/exercise/{id}",
            method = RequestMethod.PUT,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Exercise> delegateExercise(
    		@PathVariable("id") Long id, @RequestParam(value="examinerId") Long examinerId) {
        
    	logger.info("> delegateExercise id:{}", id);
    	
        Exercise exercise = exerciseService.findOne(id);
                
        //CASE 1: DELEGATE
    	if (examinerId != null){
    		Examiner examiner = examinerService.findOne(examinerId);	
    		
    		if (examiner == null || exercise == null) return new ResponseEntity<Exercise>(HttpStatus.NOT_FOUND);
 
            Exercise updatedExercise = exerciseService.delegate(exercise, examiner);
            if (updatedExercise == null) {
                return new ResponseEntity<Exercise>(
                        HttpStatus.INTERNAL_SERVER_ERROR);
            }
            
            logger.info("< delegateExercise id:{}", exercise.getId());
            return new ResponseEntity<Exercise>(updatedExercise, HttpStatus.OK);
    		
            
        //CASE 2: UNDELEGATE
    	}else{
            Exercise updatedExercise = exerciseService.delegate(exercise, null);
            if (updatedExercise == null) {
                return new ResponseEntity<Exercise>(
                        HttpStatus.INTERNAL_SERVER_ERROR);
            }
            
            logger.info("< UNdelegateExercise id:{}", exercise.getId());
            return new ResponseEntity<Exercise>(updatedExercise, HttpStatus.OK);
    	}


    }
    
    //TODO This endpoint should be in the SubmissionController class
    /**
     * US 6.1, 6.2 - Admin Global View
     * US 11.2 - Home Examiner - View Submissions
     * 
     * Web service endpoint to fetch all Submissions for a given exercise
     * 
     * @return A ResponseEntity containing a Collection of Submissions
     */
	@RequestMapping(value = "/api/submissions_by_exercise/{id}", 
			method = RequestMethod.GET, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<Submission>> getSubmissionsByExercise( @PathVariable(value="id") Long exerciseID){
		logger.info("> submissions_by_exercise id:{}", exerciseID);
		
		Collection<Submission> submissions = exerciseService.getSubmissionsByExercise(exerciseID);
		 if (submissions == null) {
             return new ResponseEntity<Collection<Submission>>(
                     HttpStatus.INTERNAL_SERVER_ERROR);
         }
		
		logger.info("< submissions_by_exercise id:{}", exerciseID);
		return new ResponseEntity<Collection<Submission>>(submissions, HttpStatus.OK);
	}


}
