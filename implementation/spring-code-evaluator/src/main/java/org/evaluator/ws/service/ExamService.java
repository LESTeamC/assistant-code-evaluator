package org.evaluator.ws.service;

import java.util.Collection;
import java.util.List;

import org.evaluator.ws.model.Exam;
import org.evaluator.ws.model.ExerciseDTO;
import org.evaluator.ws.model.Student;
import org.evaluator.ws.model.StudentExam;

public interface ExamService {

	/**
	 * Find an Exam by the id attribute value.
	 * 
	 * @param id
	 *            A Long Id to query the repository.
	 * @return An Exam instance or <code>null</code> if none found.
	 */
	Exam findById(Long id);

	void delete(Long id);

	Exam findBySubmissionId(Long id);

	Collection<Exam> findAll();

	Exam create(Exam exam);

	Collection<Exam> findByExaminer(Long examinerID);

	Collection<ExerciseDTO> findExamsByExaminer(String usernameID);

	List<StudentExam> buildGrades(Long examId);
	
	Exam update(Exam exam);
		
	Exam submission_update(Exam exam);

	void assign_students(Long examID, List<Student> stu);

}
