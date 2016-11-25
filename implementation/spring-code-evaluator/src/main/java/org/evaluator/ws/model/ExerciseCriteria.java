package org.evaluator.ws.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class ExerciseCriteria {

	/**
	 * Unique ID
	 */
	@Id
	@GeneratedValue
	private Long id;

	/**
	 * Exercise that has this criteria
	 */
	
	@NotNull
	@ManyToOne(
			fetch = FetchType.EAGER,
			optional = false)
	@JoinColumn(name = "exerciseId")
	@JsonBackReference
	private Exercise exercise;

	/**
	 * Criteria text
	 */
	@NotNull
	private String description;

	/**
	 * Range of values for this criteria
	 */
	@NotNull
	private int gama;

	/**
	 * Percentage weight of Criteria in the exercise
	 */
	@NotNull
	private int weight;
	
	@OneToMany(
			fetch = FetchType.EAGER,
			cascade = CascadeType.ALL,
			mappedBy ="criteria")
	@JsonIgnore
	private List<SubmissionCriteria> criteria;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Exercise getExercise() {
		return exercise;
	}

	public void setExercise(Exercise exercise) {
		this.exercise = exercise;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getGama() {
		return gama;
	}

	public void setGama(int gama) {
		this.gama = gama;
	}

	public int getWeight() {
		return weight;
	}

	public void setWeight(int weight) {
		this.weight = weight;
	}
	
	
}
