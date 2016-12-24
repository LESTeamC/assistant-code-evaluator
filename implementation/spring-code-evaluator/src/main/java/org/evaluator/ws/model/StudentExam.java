package org.evaluator.ws.model;

import java.util.HashMap;

/**
 * This class is not a DataBase Entity
 * It represents one Student's entry in an Exam, or a Grade
 * 
 * @author Manuel Zamith
 */

public class StudentExam {
	
	public StudentExam(){
		this.gradesByExercise = new HashMap<String, Double>();
	}
	
	public StudentExam(String examName){
		this.examName = examName;
		this.gradesByExercise = new HashMap<String, Double>();
	}
	
	public StudentExam(String examName, String username){
		this.examName = examName;
		this.studentUsername = username;
		this.gradesByExercise = new HashMap<String, Double>();
	}
	
	/**
	 * Name of the Exam in which this evaluation is inserted
	 */
	public String examName;
	
	/**
	 * The student that is being Graded, represented by its username
	 */
	public String studentUsername;
	
	/**
	 * Hash map in which the Key is a string with the Exercise's name and the value is the Grade given to this Submission
	 */
	public HashMap<String, Double> gradesByExercise;
	
	/**
	 * The sum of all exercise's grades
	 */
	public double finalGrade;
	
	//GETTERS AND SETTERS

	public String getExamName() {
		return examName;
	}

	public void setExamName(String examName) {
		this.examName = examName;
	}

	public String getStudentUsername() {
		return studentUsername;
	}

	public void setStudentUsername(String studentUsername) {
		this.studentUsername = studentUsername;
	}

	public HashMap<String, Double> getGradesByExercise() {
		return gradesByExercise;
	}

	public void setGradesByExercise(HashMap<String, Double> gradesByExercise) {
		this.gradesByExercise = gradesByExercise;
	}

	public double getFinalGrade() {
		return finalGrade;
	}

	public void setFinalGrade(double finalGrade) {
		this.finalGrade = finalGrade;
	}
	
	/**
	 * Allows to add an entry to the gradesByExercise Map
	 * @param exerciseName
	 * @param grade
	 */
	public void addGrade(String exerciseName, double grade){
		this.gradesByExercise.put(exerciseName, grade);
	}
	
}
