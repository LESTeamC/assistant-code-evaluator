package org.evaluator.ws.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

/**
 * The Exam class is an entity model object.
 * 
 * @author Manuel Zamith
 */

@Entity
public class Exercise {

	/**
	 * The default serial version UID.
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * Unique ID
	 */
	@Id
	@GeneratedValue
	private Long id;

	/**
	 * Examiner delegated to the exercise
	 */
	
	@ManyToOne(
			fetch = FetchType.EAGER,
			optional = false)
	@JoinColumn(name = "examinerId")
	private Examiner examiner = null;

	/**
	 * Exam of the exercise
	 */
	@NotNull
	@ManyToOne(
			fetch = FetchType.EAGER,
			optional = false)
	@JoinColumn(name="examId")
	private Exam exam;

	/**
	 * Question of the exercise
	 */
	@NotNull
	private String question;

	/**
	 * Descriptive name of the exercise
	 */
	@NotNull
	private String name;

	/**
	 * Qualificative status of the exercise grading process (Open, Closed)...
	 */
	@NotNull
	private String status = "O";
	
	/**
	 * Quantitative percentage value of the status
	 */
	@NotNull
	private int progress = 0;

	/**
	 * Number of submissions of the exercise
	 */
	@NotNull
	private int nsubmissions = 0;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Examiner getExaminer() {
		return examiner;
	}

	public void setExaminer(Examiner examiner) {
		this.examiner = examiner;
	}

	public Exam getExam() {
		return exam;
	}

	public void setExam(Exam exam) {
		this.exam = exam;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	public int getNsubmissions() {
		return nsubmissions;
	}

	public void setNsubmissions(int nsubmissions) {
		this.nsubmissions = nsubmissions;
	}	
	
	

}




















