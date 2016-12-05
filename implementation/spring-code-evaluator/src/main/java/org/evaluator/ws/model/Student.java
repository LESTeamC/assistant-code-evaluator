package org.evaluator.ws.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class Student {

	/**
	 * Unique ID
	 */
	@Id
	@GeneratedValue
	private Long id;

	/**
	 * Student name
	 */
	private String name;

	/**
	 * Student Username
	 */
	@NotNull
	private String username;

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

	
}
