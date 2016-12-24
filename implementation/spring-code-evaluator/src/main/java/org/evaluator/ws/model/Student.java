package org.evaluator.ws.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

/**
 * The Student class is an Entity Model class, that represents a Student.
 * @author Manuel Zamith
 * @author Paulo Barbosa
 *
 */
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
	
	public Student() {
		super();
	}

	
	public Student(String name, String username) {
		super();
		this.name = name;
		this.username = username;
	}


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
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((username == null) ? 0 : username.hashCode());
		return result;
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Student other = (Student) obj;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equalsIgnoreCase(other.username))
			return false;
		return true;
	}

	
}
