package org.evaluator.ws.model;

public final class ExerciseSubmissionImportDTO {

	private String studentNumber;
	private String studentName;
	private String numberOfQuestions;
	private boolean match;
	
	public ExerciseSubmissionImportDTO() {
		super();
	}
	
	
	public ExerciseSubmissionImportDTO(String studentNumber, String studentName, String numberOfQuestions,
			boolean match) {
		super();
		this.studentNumber = studentNumber;
		this.studentName = studentName;
		this.numberOfQuestions = numberOfQuestions;
		this.match = match;
	}
	
	
	public String getStudentNumber() {
		return studentNumber;
	}
	
	public void setStudentNumber(String studentNumber) {
		this.studentNumber = studentNumber;
	}
	
	public String getStudentName() {
		return studentName;
	}
	
	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}
	
	public String getNumberOfQuestions() {
		return numberOfQuestions;
	}
	
	public void setNumberOfQuestions(String numberOfQuestions) {
		this.numberOfQuestions = numberOfQuestions;
	}
	
	public boolean isMatch() {
		return match;
	}
	
	public void setMatch(boolean match) {
		this.match = match;
	}
	
	
	
}
