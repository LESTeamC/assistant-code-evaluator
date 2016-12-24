package org.evaluator.ws.web.api;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.evaluator.ws.model.Exam;
import org.evaluator.ws.model.ExerciseDTO;
import org.evaluator.ws.model.StudentExam;
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

/**
 * The ExamController class is a RESTful web service controller.
 * It handles requests related to the Exam Model Entity class.
 * 
 * @author Manuel Zamith
 * @author Paulo Barbosa
 */
@RestController
public class ExamController extends BaseController {

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private ExamService examService;

    /**
     * US 5.4 - Edit Exam
     * US 6.3 - Admin Global View
     * 
     * Web service endpoint to fetch an Exam entity with a given ID. 
     * The service returns the Exam with the given ID, or HTTP status NOT FOUND if it does not exist.
     * 
     * @param id ID attribute to query the DB
     * @return A ResponseEntity containing the Exam with the given ID.
     */
	@RequestMapping(value = "/admin/exam/{id}", 
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

    /**
     * US 3.2 - View Exams
     * 
     * Web service endpoint to fetch all Exams entities
     * The service returns the complete Collection of Exams in the platform
     * 
     * @return A ResponseEntity containing the Collection of Exams in the platform.
     */
	@RequestMapping(value = "/admin/exams", 
			method = RequestMethod.GET, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<Exam>> getExams() {
		logger.info("> getExams");

		Collection<Exam> exams = examService.findAll();
		if (exams == null) {
			return new ResponseEntity<Collection<Exam>>(HttpStatus.NOT_FOUND);
		}

		logger.info("< getExams");
		return new ResponseEntity<Collection<Exam>>(exams, HttpStatus.OK);
	}

    /**
     * US 13.5 - Exam information on Examiner Workstation
     * 
     * Web service endpoint to fetch an Exam entity in which a given Submission belongs
     * 
     * @param id Submission ID attribute to query the DB
     * @return A ResponseEntity containing the Exam in which the Submission belongs
     */
	@RequestMapping(value = "/api/exam-by-submission/{id}", 
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

    /**
     * US 5.1 - Create Exam
     * 
     * Web service endpoint to persist a new Exam entity.
     * 
     * @param exam an Exam entity, in the Body of request
     * @return A ResponseEntity containing the created Exam (with ID)
     */
	@RequestMapping(value = "/admin/exam", 
			method = RequestMethod.POST, 
			consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Exam> createExam(@RequestBody Exam exam) {
		logger.info("> createExam");

		try {
			Exam savedExam = examService.create(exam);
			logger.info("< createExam");

			return new ResponseEntity<Exam>(savedExam, HttpStatus.CREATED);

		} catch (DataIntegrityViolationException SQLe) {

			// Check for duplicate Key in Request (duplicate name)

			// From mySQL Docs:
			// Error: 1022 SQLSTATE: 23000 (ER_DUP_KEY)
			// Message: Can't write; duplicate key in table '%s'

			if (SQLe.getCause() instanceof JDBCException) {

				if (((JDBCException) SQLe.getCause()).getSQLException().getSQLState().equals("23000")) {
					//Return CONFLICT status if there is already an exam with the same Name.
					return new ResponseEntity<Exam>(HttpStatus.CONFLICT);
				} else
					return new ResponseEntity<Exam>(HttpStatus.BAD_REQUEST);
			} else {
				return new ResponseEntity<Exam>(HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {
			logger.error(e.getMessage());
			
			//Return BAD_REQUEST status for a generic error.
			return new ResponseEntity<Exam>(HttpStatus.BAD_REQUEST);
		}

	}

    /**
     * NOT USED
     */
	@RequestMapping(value = "/api/exams_by_examiner/{id}", 
			method = RequestMethod.GET, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Exam>> getExamByExaminer(@PathVariable("id") Long examinerID) {
		logger.info("> getExamByExaminer id:{}", examinerID);

		ArrayList<Exam> exams = (ArrayList<Exam>) examService.findByExaminer(examinerID);
		if (exams == null) {
			return new ResponseEntity<List<Exam>>(HttpStatus.NOT_FOUND);
		}

		logger.info("< getExamByExaminer id:{}", examinerID);
		return new ResponseEntity<List<Exam>>(exams, HttpStatus.OK);
	}

	//TODO This service should be in the ExerciseController API
    /**
     * US 11.1 - Examiner Home
     * 
     * Web service endpoint to fetch all Exercises assigned to a given Examiner
     * 
     * @param username Username attribute of the Examiner
     * @return A ResponseEntity containing a Collection of all exercises assigned to the given Examiner entity.
     */
	@RequestMapping(value = "/api/exercises_by_examiner/{usernameID}", 
			method = RequestMethod.GET, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<ExerciseDTO>> getExercisesByExaminer(
			@PathVariable("usernameID") String usernameID) {
		
		logger.info("> getExercisesByExaminer id:{}", usernameID);

		Collection<ExerciseDTO> exercises = examService.findExamsByExaminer(usernameID);
		if (exercises == null) {
			return new ResponseEntity<Collection<ExerciseDTO>>(HttpStatus.NOT_FOUND);
		}

		logger.info("< getExercisesByExaminer id:{}", usernameID);
		return new ResponseEntity<Collection<ExerciseDTO>>(exercises, HttpStatus.OK);
	}

    /**
     * US 5.2 - Delete Exam
     * 
     * Web service endpoint to delete an Exam Entity
     * All child entities will be removed as well, through cascading 
     * (Exercises, Submissions, Exercise Criteria and Submission Criteria)
     * 
     * @param id an ExamId
     * @return A ResponseEntity containing NO CONTENT http status;
     */
	@RequestMapping(value = "/admin/exam/{id}", 
			method = RequestMethod.DELETE)
	public ResponseEntity<Exam> deleteExam(@PathVariable("id") Long id) {
		logger.info("> deleteExam id:{}", id);

		examService.delete(id);

		logger.info("< deleteExam id:{}", id);
		return new ResponseEntity<Exam>(HttpStatus.NO_CONTENT);
	}

    /**
     * US 10.1 - Export Grades to CSV
     * US 6.3 - Admin Global View - Student Grades
     * 
     * Web service endpoint to fetch the Student Grades of a given Exam.
     * Grades are given through StudentExam objects, that supply a HashMap with the grades by exercise.
     * If a given submission has not been graded yet, its grade will be a negative value.
     * If the student did not submit a file for the exercise, this entry will not exist in the HashMap.
     * 
     * @param id The ID for the Exam
     * @return A ResponseEntity containing the a List of StudentExam objects that contain the Grading Information.
     */
	@RequestMapping(value = "/admin/grades/{id}", 
			method = RequestMethod.GET, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<StudentExam>> getGrades(@PathVariable("id") Long id) {
		logger.info("> getGrades id:{}", id);

		try {
			List<StudentExam> grades = examService.buildGrades(id);
			logger.info("< getGrades id:{}", id);
			return new ResponseEntity<List<StudentExam>>(grades, HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<List<StudentExam>>(HttpStatus.BAD_REQUEST);
		}

	}
	
    /**
     * US 5.3 - Edit Exam
     * 
     * Web service endpoint to change an Exam entity.
     * Once an Exam entity is created the platform only allows to change the basic information of the exam
     * and the weight of the exercise and criteria.
     * 
     * @param exam Entity to change, in the Body of request
     * @return A ResponseEntity containing altered Exam.
     */
    @RequestMapping(
            value = "/admin/exam/{id}",
            method = RequestMethod.PUT,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Exam> updateExam(
            @RequestBody Exam exam) {
        logger.info("> updateExam id:{}", exam.getId());
        
		try {
			
	        Exam updatedExam = examService.update(exam);
	        if (updatedExam == null) {
	            return new ResponseEntity<Exam>(
	                    HttpStatus.INTERNAL_SERVER_ERROR);
	        }

	        logger.info("< updateGreeting id:{}", exam.getId());
	        return new ResponseEntity<Exam>(updatedExam, HttpStatus.OK);

		} catch (DataIntegrityViolationException SQLe) {

			// Check for duplicate Key in Request (duplicate name)

			// From mySQL Docs:
			// Error: 1022 SQLSTATE: 23000 (ER_DUP_KEY)
			// Message: Can't write; duplicate key in table '%s'

			if (SQLe.getCause() instanceof JDBCException) {

				if (((JDBCException) SQLe.getCause()).getSQLException().getSQLState().equals("23000")) {
					
					// return CONFLICT http status if the there is already an exam with the same name
					return new ResponseEntity<Exam>(HttpStatus.CONFLICT);
				} else
					return new ResponseEntity<Exam>(HttpStatus.BAD_REQUEST);
			} else {
				return new ResponseEntity<Exam>(HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {
			logger.info("> createExam");
			logger.error(e.getMessage());
			return new ResponseEntity<Exam>(HttpStatus.BAD_REQUEST);
		}
    }

}
