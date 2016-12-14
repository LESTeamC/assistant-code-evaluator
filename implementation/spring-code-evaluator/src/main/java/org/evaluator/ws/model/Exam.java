package org.evaluator.ws.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonManagedReference;

/**
 * The Exam class is an entity model object.
 * 
 * @author Manuel Zamith
 */

@Entity
public class Exam extends TransactionalEntity {
	
	public Exam(){};
	
	public Exam(String name, Date date, String degree, String course, String language){
		this.name = name;
		this.date = date;
		this.degree = degree;
		this.course = course;
		this.language = language;
	};

	/**
	 * The default serial version UID.
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * The name of the exam
	 */
	@NotNull
	private String name;

	/**
	 * The date in which the exam took place.
	 */
	@NotNull
	private Date date;

	/**
	 * Degree of the exam (Curso)
	 */
	@NotNull
	private String degree;

	/**
	 * Course of the exam (Unidade Curricular)
	 */
	@NotNull
	private String course;

	/**
	 * Qualificator of the status (Open, Closed...)
	 */
	@NotNull
	private String status = "O";

	/**
	 * Quantification of the progress, in percentage
	 */
	@NotNull
	private int progress = 0;

	/**
	 * Number of questions of the exam
	 */
	@NotNull
	private int nquestions = 0;
	
	/**
	 * Code Language
	 */
	@NotNull
	private String language;

	@OneToMany(
			fetch = FetchType.EAGER, 
			cascade = CascadeType.ALL,
			mappedBy ="exam")
	@JsonManagedReference
	private Set<Exercise> exercises;
	
    @ManyToMany(
            fetch = FetchType.EAGER,
            cascade = CascadeType.MERGE)
    @JoinTable(
            name = "StudentExam",
            joinColumns = @JoinColumn(
                    name = "examId",
                    referencedColumnName = "id") ,
            inverseJoinColumns = @JoinColumn(
                    name = "studentId",
                    referencedColumnName = "id") )
    private List<Student> students;


	/**
	 * getters and setters
	 */
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getDegree() {
		return degree;
	}

	public void setDegree(String degree) {
		this.degree = degree;
	}

	public String getCourse() {
		return course;
	}

	public void setCourse(String course) {
		this.course = course;
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

	public int getNquestions() {
		return nquestions;
	}

	public void setNquestions(int nquestions) {
		this.nquestions = nquestions;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public Set<Exercise> getExercises() {
		return exercises;
	}

	public void setExercises(Set<Exercise> exercises) {
		this.exercises = exercises;
	}

	public List<Student> getStudents() {
		return students;
	}

	public void setStudents(List<Student> students) {
		this.students = students;
	}
	
		public void addStudent(Student stu) {
		this.students.add(stu);
	}
	
	// PB
	public Exercise getExerciseByName(String name) {
		for (Exercise e : this.exercises) {
			if (e.getName().compareToIgnoreCase(name) == 0) {
				return e;
			}
		}
		return null;
	}

	// PB
	public Student getStudentByName(String name) {
		List<Student> students = new ArrayList<Student>(this.students);
		for (Student s : students) {
			if (s.getUsername().compareToIgnoreCase(name) == 0) {
				return s;
			}
		}
		return null;
	}
	
	//PB
	public Boolean doesStudentExists(String studentUsername) {
		List<Student> students = new ArrayList<Student>(this.students);
		for (Student s : students) {
			if (s.getUsername().compareToIgnoreCase(studentUsername) == 0) {
				return true;
			}
		}
		return false;
	}
	
		// PB
	public void updateExamSubmission(Exercise e, Submission s) {

		Iterator<Submission> it1 = e.getSubmissions().iterator();
		while (it1.hasNext()) {
			Submission sub = it1.next();
			if (sub.getStudent().getUsername().compareToIgnoreCase(s.getStudent().getUsername()) == 0) {
				sub.setOutput(s.getOutput());
				sub.setCode(s.getCode());
				break;
			}
		}
		e.addSubmission(s);
		this.exercises.add(e);
	}
	
	// PB
	public void updateExamSubmission(Exercise e, List<Submission> submissions) {
		System.out.println("updateExamSubmission");

		Set<ExerciseCriteria> criterias = e.getCriteria();
		for (Submission s : submissions) {
			Iterator<Submission> it1 = e.getSubmissions().iterator();
			while (it1.hasNext()) {
				Submission sub = it1.next();
				if (sub.getStudent().getUsername().compareToIgnoreCase(s.getStudent().getUsername()) == 0) {
					System.out.println("Changing" + sub.getStudent().getUsername());
					sub.setOutput(s.getOutput());
					sub.setCode(s.getCode());
					break;
				}
			}
			if (criterias != null) {
				Set<SubmissionCriteria> subCriterias = new HashSet<SubmissionCriteria>();
				for (ExerciseCriteria c : criterias) {
					SubmissionCriteria subC = new SubmissionCriteria(s, c);
					subCriterias.add(subC);
				}
				s.setCriteria(subCriterias);
			}
			e.addSubmission(s);
		}
		this.exercises.add(e);
	}

}




















