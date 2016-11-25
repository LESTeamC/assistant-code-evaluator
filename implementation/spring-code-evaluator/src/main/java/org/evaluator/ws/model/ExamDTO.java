package org.evaluator.ws.model;

import java.text.SimpleDateFormat;

public class ExamDTO {

	private String name;

	/**
	 * The date in which the exam took place.
	 */
	private String dateString;

	/**
	 * Degree of the exam (Curso)
	 */
	private String degree;

	/**
	 * Course of the exam (Unidade Curricular)
	 */
	private String course;

	/**
	 * Qualificator of the status (Open, Closed...)
	 */
	private String status = "O";
	
	public ExamDTO(){
		
	}
	
	public ExamDTO(Exam e) {
		super();
		this.name = e.getName();
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		this.dateString = dateFormat.format(e.getDate());
		this.degree = e.getDegree();
		this.course = e.getCourse();
		this.status = e.getStatus();
	}

	public ExamDTO(String name, String date, String degree, String course, String status) {
		super();
		this.name = name;
		this.dateString = date;
		this.degree = degree;
		this.course = course;
		this.status = status;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDateString() {
		return dateString;
	}

	public void setDateString(String date) {
		this.dateString = date;
	}

	public String getDegree() {
		return degree;
	}

	public void setDegree(String degree) {
		this.degree = degree;
	}

	public String getCourse() {
		return course;
	}

	public void setCourse(String course) {
		this.course = course;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	
}
