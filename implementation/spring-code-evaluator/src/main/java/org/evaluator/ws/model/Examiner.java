package org.evaluator.ws.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PreRemove;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * The examiner class is a model Entity class, that represents an examiner
 * @author Manuel Zamith
 *
 */
@Entity
public class Examiner {
	
	/**
	 * Unique ID
	 */
	@Id
	@GeneratedValue
	private Long id;

	/**
	 * Examiner full name
	 */
	@NotNull
	private String name;

	/**
	 * Examiner academic number
	 */
	@NotNull
	private String username;

	/**
	 * Examiner email address
	 */
	@NotNull
	private String email;

	@NotNull
	@OneToOne(
			fetch = FetchType.EAGER,
			cascade=CascadeType.ALL,
			optional = false)
	@JoinColumn(
			name = "accountId")
	private Account account;
	
	@OneToMany(
			fetch = FetchType.LAZY,
			mappedBy ="examiner")
	@JsonIgnore
	private Set<Exercise> exercises;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Set<Exercise> getExercises() {
		return exercises;
	}

	public void setExercises(Set<Exercise> exercises) {
		this.exercises = exercises;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}
	
	/**
	 * Allows deletion of an examiner from the platform without compromising the Exercises data
	 * When an Examiner is removed, all the exercises assigned to him will become unassigned (examiner column will be null)
	 */
	@PreRemove
	private void preRemove() {
	    for (Exercise e : exercises) {
	        e.setExaminer(null);
	    }
	}

	
}
