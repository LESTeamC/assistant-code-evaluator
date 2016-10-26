package org.evaluator.ws.model;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Submission {

	/**
	 * Unique ID
	 */
	@Id
	@GeneratedValue
	private Long id;

	/**
	 * Exercise that has this submission
	 */
	@NotNull
	@ManyToOne(
			fetch = FetchType.EAGER,
			optional = false)
	@JoinColumn(name = "exerciseId")
	private Exercise exercise;

	
	/**
	 * Student that submitted this submission
	 */
	@NotNull
	@ManyToOne(
			fetch = FetchType.EAGER,
			optional = false)
	@JoinColumn(name = "studentId")
	private Student student;
	
	
	/**
	 * Code text from submission
	 */
	private String code;

	/**
	 * Current status of submission
	 */
	@NotNull
	private String status = "O";

	/**
	 * Total current grade of the submission
	 */
	@NotNull
	private int grade;
	
	/**
	 * Directory path to the files of this submission
	 */
	@NotNull
	private String path;
	
	@OneToMany(
			fetch = FetchType.EAGER,
			mappedBy ="submission")
	private Set<SubmissionCriteria> criteria;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getGrade() {
		return grade;
	}

	public void setGrade(int grade) {
		this.grade = grade;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public Exercise getExercise() {
		return exercise;
	}

	public void setExercise(Exercise exercise) {
		this.exercise = exercise;
	}

	public Set<SubmissionCriteria> getCriteria() {
		return criteria;
	}

	public void setCriteria(Set<SubmissionCriteria> criteria) {
		this.criteria = criteria;
	}
	
	

}
