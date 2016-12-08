package org.evaluator.ws.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityExistsException;
import javax.persistence.NoResultException;

import org.evaluator.ws.model.Exam;
import org.evaluator.ws.model.Exercise;
import org.evaluator.ws.model.ExerciseCriteria;
import org.evaluator.ws.model.ExerciseDTO;
import org.evaluator.ws.model.Greeting;
import org.evaluator.ws.model.Student;
import org.evaluator.ws.model.StudentExam;
import org.evaluator.ws.model.Submission;
import org.evaluator.ws.model.SubmissionCriteria;
import org.evaluator.ws.repository.ExamRepository;
import org.evaluator.ws.repository.SubmissionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.metrics.CounterService;
import org.springframework.cache.annotation.CachePut;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class ExamServiceBean implements ExamService {

	private final double GRADE_FRACTION = (20.0 / 100.0);

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

	@Autowired
	private SubmissionRepository submissionRepository;

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
	public Exam findBySubmissionId(Long id) {
		logger.info("> findBySubmission");

		Submission submission = submissionRepository.findOne(id);

		Exam exam = submission.getExercise().getExam();

		logger.info("< findBySubmission");
		return exam;
	}

	@Override
	public Collection<Exam> findAll() {
		logger.info("> findAll");
		Collection<Exam> exams = examRepository.findAll();

		logger.info("< findById");
		return exams;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public Exam create(Exam exam) {
		logger.info("> createExam");

		counterService.increment("method.invoked.examServiceBean.create");

		// Ensure the entity object to be created does NOT exist in the
		// repository. Prevent the default behavior of save() which will update
		// an existing entity if the entity matching the supplied id exists.
		if (exam.getId() != null) {
			// Cannot create Exam with specified ID value
			logger.error("Attempted to create a Exam, but id attribute was not null.");
			throw new EntityExistsException("The id attribute must be null to persist a new entity.");
		}

		// Execute Student Service.

		if (exam.getStudents() != null) {

			List<Student> students = studentService.createList(exam.getStudents());
			exam.setStudents(students);
		}

		// Calculate number of Questions and assign exercise name
		Set<Exercise> exercisesSet = exam.getExercises();

		if (exercisesSet != null) {
			exam.setNquestions(exercisesSet.size());

			for (Exercise e : exercisesSet) {
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
	public Collection<ExerciseDTO> findExamsByExaminer(String examinerID) {
		logger.info("> findExercisesByExaminer");
		Collection<Exam> exams = examRepository.findAll();
		Collection<ExerciseDTO> exercises = new ArrayList<ExerciseDTO>();
		for (Exam a : exams) {
			for (Exercise e : a.getExercises()) {
				if (e.getExaminer() != null && e.getExaminer().getUsername().compareToIgnoreCase(examinerID) == 0) {
					exercises.add(new ExerciseDTO(e));
				}
			}
		}

		logger.info("< findExercisesByExaminer");
		return exercises;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void delete(Long id) {
		logger.info("> delete id:{}", id);

		examRepository.delete(id);

		logger.info("< delete id:{}", id);
	}

	@Override
	public List<StudentExam> buildGrades(Long examId) {

		// List of submissions for given exam, ordered by the student ID
		List<Submission> submissions = submissionRepository.findByExamIdOrderByStudentId(examId);
		List<StudentExam> grades = new ArrayList<StudentExam>();

		Exam exam = examRepository.findOne(examId);

		// Make sure the given exam exists
		if (exam == null) {
			logger.error("Could not find exam with given ID");
			throw new EntityExistsException("Exam does not exist.");
		}

		// Make sure there are submissions for the exam.
		// Else, return an empty array and avoid Index out of Bounds Exception
		if (submissions.size() == 0) {
			return grades;
		}

		// Current Student. Each Grade(StdentExam) exists for each student.
		Student currentStudent = submissions.get(0).getStudent();

		// The exam will always be the same
		String examName = exam.getName();

		// Initialize variables for first Student
		StudentExam studentExam = new StudentExam(examName, currentStudent.getUsername());
		double finalGrade = 0;

		// Iterate over all submissions
		for (Submission s : submissions) {

			// Calculate the submission grade, from 0-20;
			double submissionGrade = this.getFinalGrade(s);

			// Get the exerciseName
			String exerciseName = s.getExercise().getName();

			// If the Student did not change, Build the data and add it to
			// Current Object
			if (s.getStudent().getId() == currentStudent.getId()) {

				// As a convention, if the submission exists but is not yet
				// graded by an examiner,
				// we set the grade to a negative value;
				if (s.getStatus().equals("O")) {
					studentExam.addGrade(exerciseName, -1);
					// If the submission is graded, add the grade to the
					// ExerciseMap for the student
				} else {
					studentExam.addGrade(exerciseName, submissionGrade);
				}

				// Sum up the value, as to calculate the Exam Final Grade, which
				// is the sum of the submissions grades
				finalGrade += submissionGrade;
				studentExam.setFinalGrade(finalGrade);

				// If student is not the same, we create a new Object and
				// proceed the same way.
			} else {

				// Add previous student grades to list
				grades.add(studentExam);

				currentStudent = s.getStudent();
				studentExam = new StudentExam(examName, currentStudent.getUsername());
				finalGrade = 0;

				if (s.getStatus().equals("O")) {
					studentExam.addGrade(exerciseName, -1);
				} else {

					studentExam.addGrade(exerciseName, submissionGrade);
				}

				finalGrade += submissionGrade;
				studentExam.setFinalGrade(finalGrade);
			}
		}

		grades.add(studentExam);

		return grades;
	}

	private double getFinalGrade(Submission submission) {

		// 1. Get grade (in percentage)
		// 2. Multiply by exercise weight fraction
		// 3. Multiply by grade fraction, to scale the result from 0-20;
		// 4. Round result to 2 decimal cases

		return this.roundDecimal(
				submission.getGrade() * submission.getExercise().getWeight() * 0.01 * this.GRADE_FRACTION, 2);
	}

	private double roundDecimal(double number, int decimalCases) {

		double mask = Math.pow(10.0, decimalCases);

		return Math.round(number * mask) / mask;
	}
	
    @Override
    @Transactional(
            propagation = Propagation.REQUIRED,
            readOnly = false)
    public Exam update(Exam exam) {
        logger.info("> updateExam id:{}", exam.getId());

        counterService.increment("method.invoked.greetingServiceBean.update");

        // Ensure the entity object to be updated exists in the repository to
        // prevent the default behavior of save() which will persist a new
        // entity if the entity matching the id does not exist
        Exam examToUpdate = this.findById(exam.getId());
        if (examToUpdate == null) {
            // Cannot update Greeting that hasn't been persisted
            logger.error(
                    "Attempted to update an Exam, but the entity does not exist.");
            throw new NoResultException("Requested entity not found.");
        }
        
        Exam updatedExam = examRepository.save(exam);
        this.updateGrades(updatedExam);

        logger.info("< updateExam id:{}", exam.getId());
        return updatedExam;
    }
    
    private void updateGrades(Exam examToUpdate){
    	
    	List<Submission> submissions = submissionRepository.findByExamIdOrderByStudentId(examToUpdate.getId());
    	
    	//Update final grade of each submission
    	
    	// 1. For each submission:
    	
    	for (Submission s : submissions){
    		double grade = this.calculateGrade(s);
    		s.setGrade(this.roundDecimal(grade, 2));
    		submissionRepository.save(s);
    	}
    	
    }
    
    private double calculateGrade(Submission submission){
    	
    	double grade = 0;
    			
    	for (SubmissionCriteria s : submission.getCriteria()){
    		
    		ExerciseCriteria criteria = s.getCriteria();
    		if(s.getGrade() >= 0){
    			grade += (s.getGrade() / criteria.getGama()) * criteria.getWeight();
    		}
    		
    	}
    	
    	return grade;
    }
}
