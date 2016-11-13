package org.evaluator.ws.model;

import java.util.Set;

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

	/**
	 * Descriptive name of the exercise
	 */
	@NotNull
	@OneToOne(
			fetch = FetchType.EAGER,
			optional = false)
	@JoinColumn(
			name = "accountId")
	@JsonIgnore
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
	
	@PreRemove
	private void preRemove() {
	    for (Exercise e : exercises) {
	        e.setExaminer(null);
	    }
	}

	
}
