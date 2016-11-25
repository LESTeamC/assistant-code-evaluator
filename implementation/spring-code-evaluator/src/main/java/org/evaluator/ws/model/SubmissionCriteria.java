package org.evaluator.ws.model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class SubmissionCriteria {
	
	/**
	 * Unique ID
	 */
	@Id
	@GeneratedValue
	private Long id;

	/**
	 * Submission
	 */
	@NotNull
	@ManyToOne(
			fetch = FetchType.EAGER,
			optional = false)
	@JoinColumn(name = "submissionId")
	@JsonBackReference
	private Submission submission;

	/**
	 * General Criteria
	 */
	@NotNull
	@ManyToOne(
			fetch = FetchType.EAGER,
			optional = false)
	@JoinColumn(name = "exerciseCriteriaId")
	private ExerciseCriteria criteria;
	
	@NotNull
	private double grade = -1;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Submission getSubmission() {
		return submission;
	}

	public void setSubmission(Submission submission) {
		this.submission = submission;
	}

	public ExerciseCriteria getCriteria() {
		return criteria;
	}

	public void setCriteria(ExerciseCriteria criteria) {
		this.criteria = criteria;
	}

	public double getGrade() {
		return grade;
	}

	public void setGrade(double grade) {
		this.grade = grade;
	}


}
