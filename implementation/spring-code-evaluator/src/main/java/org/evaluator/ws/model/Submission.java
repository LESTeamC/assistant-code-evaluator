package org.evaluator.ws.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonManagedReference;


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
	private double grade = 0;
	
	/**
	 * Directory path to the files of this submission
	 */
	@NotNull
	private String path;
	
	/**
	 * output of the submission, if its able to run
	 */
	private String output;
	
	/**
	 * comment of the submission, if its able to run
	 */
	private String comment;
	
	@OneToMany(
			fetch = FetchType.EAGER,
			cascade = CascadeType.ALL,
			mappedBy ="submission")
	@JsonManagedReference
	private Set<SubmissionCriteria> criteria;
	
	public Submission() {
	
	}
	
	public Submission(String code, String output, Exercise e, Student s) {
		this.code = code;
		this.output = output;
		this.exercise = e;
		this.student = s;
		this.path = "none";
	}

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

	public double getGrade() {
		return grade;
	}

	public void setGrade(double grade) {
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

	public String getOutput() {
		return output;
	}

	public void setOutput(String output) {
		this.output = output;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}
	

}
