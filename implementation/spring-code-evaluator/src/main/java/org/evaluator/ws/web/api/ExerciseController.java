package org.evaluator.ws.web.api;

import java.util.Collection;

import org.evaluator.ws.model.Examiner;
import org.evaluator.ws.model.Exercise;
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

@RestController
public class ExerciseController extends BaseController {
	

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private ExerciseService exerciseService;
	
	@Autowired
	private ExaminerService examinerService;
	
	@RequestMapping(
			value = "/admin/exercises",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<Exercise>> getExercises(){
		
		logger.info("> getExercises");
		
		Collection<Exercise> exercises = exerciseService.findAll();

		return new ResponseEntity<Collection<Exercise>>(exercises, HttpStatus.OK);
	}
	
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
     * Web service endpoint to update a single Exercise entity - DELEGATION. The HTTP request
     * body is expected to contain an Exercise object in JSON format. The
     * Exercise is updated in the data repository.
     * 
     * If updated successfully, the persisted Exercise is returned as JSON with
     * HTTP status 200.
     * 
     * If not found, the service returns an empty response body and HTTP status
     * 404.
     * 
     * If not updated successfully, the service returns an empty response body
     * with HTTP status 500.
     * 
     * @param exercise The Exercise object to be updated.
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

}
