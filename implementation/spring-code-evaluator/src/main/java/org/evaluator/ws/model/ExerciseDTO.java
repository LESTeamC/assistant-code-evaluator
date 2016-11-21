package org.evaluator.ws.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

public class ExerciseDTO {
	
	/**
	 * Unique ID
	 */
	private Long id;

	/**
	 * Examiner delegated to the exercise
	 */
	private Examiner examiner;
	
	/**
	 * Exam of the exercise
	 */
	private Exam exam;
	
	/**
	 * Exam of the exercise
	 */
	private String examname;

	/**
	 * Question of the exercise
	 */
	private String question;

	/**
	 * Descriptive name of the exercise
	 */
	private String name;

	/**
	 * Qualificative status of the exercise grading process (Open, Closed)...
	 */
	private String status = "O";
	
	/**
	 * Quantitative percentage value of the status
	 */
	private int progress = 0;

	/**
	 * Number of submissions of the exercise
	 */
	private int nsubmissions = 0;
	
	/**
	 * Number of submissions of the exercise
	 */
	private int weight;
	
	/**
	 * Command line command to build submissions
	 */
	private String commandbuild;
	
	/**
	 * Command line command to run submissions
	 */
	private String commandrun;
	
	/**
	 * Path to libraries directory
	 */
	private String path;
	
	/**
	 * Different Criteria for this exercise
	 */
	private Set<ExerciseCriteria> criteria;
	
	

	public ExerciseDTO() {
		super();
	}
	

	public ExerciseDTO(Long id, Examiner examiner, Exam exam, String examname, String question, String name,
			String status, int progress, int nsubmissions, int weight, String commandbuild, String commandrun,
			String path, Set<ExerciseCriteria> criteria) {
		super();
		this.id = id;
		this.examiner = examiner;
		this.exam = exam;
		this.examname = examname;
		this.question = question;
		this.name = name;
		this.status = status;
		this.progress = progress;
		this.nsubmissions = nsubmissions;
		this.weight = weight;
		this.commandbuild = commandbuild;
		this.commandrun = commandrun;
		this.path = path;
		this.criteria = criteria;
	}
	
	public ExerciseDTO(Exercise e){
		this.id = e.getId();
		this.examiner = e.getExaminer();
		e.getExam().setExercises(null);
		this.exam = e.getExam();
		this.examname = e.getExamname();
		this.question = e.getQuestion();
		this.name = e.getName();
		this.status = e.getStatus();
		this.progress = e.getProgress();
		this.weight = e.getWeight();
		this.criteria = e.getCriteria();
		this.commandbuild = e.getCommandbuild();
		this.commandrun = e.getCommandrun();
		this.path = e.getPath();
	}




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

	public String getExamname() {
		return examname;
	}

	public void setExamname(String examname) {
		this.examname = examname;
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

	public int getWeight() {
		return weight;
	}

	public void setWeight(int weight) {
		this.weight = weight;
	}

	public String getCommandbuild() {
		return commandbuild;
	}

	public void setCommandbuild(String commandbuild) {
		this.commandbuild = commandbuild;
	}

	public String getCommandrun() {
		return commandrun;
	}

	public void setCommandrun(String commandrun) {
		this.commandrun = commandrun;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public Set<ExerciseCriteria> getCriteria() {
		return criteria;
	}

	public void setCriteria(Set<ExerciseCriteria> criteria) {
		this.criteria = criteria;
	}
	
	

}
