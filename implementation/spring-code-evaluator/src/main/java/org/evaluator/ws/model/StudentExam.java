package org.evaluator.ws.model;

import java.util.HashMap;

/**
 * This class is not a DataBase Entity
 * It represents one Student's entry in an Exam
 * 
 * @author Manuel Zamith
 */

public class StudentExam {
	
	public StudentExam(){}
	
	public StudentExam(String examName){
		this.examName = examName;
	}
	
	public StudentExam(String examName, String username){
		this.examName = examName;
		this.studentUsername = username;
	}
	
	public String examName;
	
	public String studentUsername;
	
	public HashMap<String, Double> gradesByExercise;
	
	public double finalGrade;

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
	
}
