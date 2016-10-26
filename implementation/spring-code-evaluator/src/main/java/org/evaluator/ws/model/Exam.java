package org.evaluator.ws.model;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonManagedReference;

/**
 * The Exam class is an entity model object.
 * 
 * @author Manuel Zamith
 */

@Entity
public class Exam extends TransactionalEntity {

	/**
	 * The default serial version UID.
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * The name of the exam
	 */
	@NotNull
	private String name;

	/**
	 * The date in which the exam took place.
	 */
	@NotNull
	private Date date;

	/**
	 * Degree of the exam (Curso)
	 */
	@NotNull
	private String degree;

	/**
	 * Course of the exam (Unidade Curricular)
	 */
	@NotNull
	private String course;

	/**
	 * Qualificator of the status (Open, Closed...)
	 */
	@NotNull
	private String status = "O";

	/**
	 * Quantification of the progress, in percentage
	 */
	@NotNull
	private int progress = 0;

	/**
	 * Number of questions of the exam
	 */
	@NotNull
	private int nquestions = 0;
	
	/**
	 * Code Language
	 */
	@NotNull
	private String language;

	@OneToMany(
			fetch = FetchType.EAGER, 
			cascade = CascadeType.ALL,
			mappedBy ="exam")
	@JsonManagedReference
	private Set<Exercise> exercises;


	/**
	 * getters and setters
	 */
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
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

	public int getProgress() {
		return progress;
	}

	public void setProgress(int progress) {
		this.progress = progress;
	}

	public int getNquestions() {
		return nquestions;
	}

	public void setNquestions(int nquestions) {
		this.nquestions = nquestions;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public Set<Exercise> getExercises() {
		return exercises;
	}

	public void setExercises(Set<Exercise> exercises) {
		this.exercises = exercises;
	}

}




















