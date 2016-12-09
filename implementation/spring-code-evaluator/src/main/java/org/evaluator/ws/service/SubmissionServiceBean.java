package org.evaluator.ws.service;

import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.Set;
import java.util.Calendar;
import java.util.Collection;
import java.util.HashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import javax.persistence.NoResultException;

import org.evaluator.ws.model.Exam;
import org.evaluator.ws.model.Exercise;
import org.evaluator.ws.model.Student;
import org.evaluator.ws.model.Submission;
import org.evaluator.ws.repository.ExamRepository;
import org.evaluator.ws.repository.ExerciseRepository;
import org.evaluator.ws.repository.SubmissionRepository;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.nio.channels.FileChannel;
import java.text.SimpleDateFormat;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(
        propagation = Propagation.SUPPORTS,
        readOnly = true)
public class SubmissionServiceBean implements SubmissionService {
	
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    /**
     * The Spring Data repository for Student entities.
     */
    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    private ExerciseRepository exerciseRepository;
    
    @Autowired
    private ExamRepository examRepository;
    
    @Autowired
    private ExerciseService exerciseService;
    
    @Autowired
    private ExamService examService;
    
	@Override
	public Submission findOne(Long id) {
		
		logger.info("> findSubmission id:{}", id);
		
		Submission submission = submissionRepository.findOne(id);
		
		logger.info("< findSubmission id:{}", id);
		
		return submission;
	}
	
	@Override
	public Collection<Submission> findOpenByExercise (Long exerciseId) {
			
		Collection<Submission> submissions = submissionRepository.findByStatusAndExerciseId("O", exerciseId);		
		return submissions;
	}
	
    @Override
    @Transactional(
            propagation = Propagation.REQUIRED,
            readOnly = false)
    public Submission update(Submission submission) {
        logger.info("> updateSubmission id:{}", submission.getId());

        // Ensure the entity object to be updated exists in the repository to
        // prevent the default behavior of save() which will persist a new
        // entity if the entity matching the id does not exist
        Submission submissionToUpdate = findOne(submission.getId());
        if (submissionToUpdate == null) {
            // Cannot update Greeting that hasn't been persisted
            logger.error(
                    "Attempted to update a Greeting, but the entity does not exist.");
            throw new NoResultException("Requested entity not found.");
        }
        

        //this.updateExamAndExerciseStatus(updatedSubmission);
        this.updateExamAndExercise(submissionToUpdate);
        
        submission.setStatus("C");
        Submission updatedSubmission = submissionRepository.save(submission);

        logger.info("< updateSubmission id:{}", updatedSubmission.getId());
        return updatedSubmission;
    }
    
    @Override
    @Transactional(
            propagation = Propagation.REQUIRED,
            readOnly = false)
    public Submission changeComment(Long id, String comment) {
        logger.info("> changeComment id:{}", id);

        // Ensure the entity object to be updated exists in the repository to
        // prevent the default behavior of save() which will persist a new
        // entity if the entity matching the id does not exist
        Submission submissionToUpdate = findOne(id);
        if (submissionToUpdate == null) {
            // Cannot update Greeting that hasn't been persisted
            logger.error(
                    "Attempted to update a Greeting, but the entity does not exist.");
            throw new NoResultException("Requested entity not found.");
        }
        
        submissionToUpdate.setComment(comment);
        Submission updatedSubmission = submissionRepository.save(submissionToUpdate);
        
        logger.info("< changeComment id:{}", id);
        return updatedSubmission;
    }
    
    private void updateExamAndExerciseStatus(Submission submission){
    	
    	
    	if (this.findOpenByExercise(submission.getExercise().getId()).size() == 0) {
    		//updateExercise to Closed
    		
    		Exercise exerciseToUpdate = submission.getExercise();
    		
    		exerciseToUpdate.setStatus("C");
    		Exercise updatedExercise = exerciseRepository.save(exerciseToUpdate);
    		
    		if (exerciseService.findAllOpenByExam(updatedExercise.getExam().getId()).size() == 0) {
    			//updateExam to Closed
    			
    			Exam examToUpdate = updatedExercise.getExam();
    			examToUpdate.setStatus("C");
    			examRepository.save(examToUpdate);
    		}
    	}
    }
    
    private void updateExamAndExercise(Submission submission){
    	
    	Exercise exerciseToUpdate = exerciseRepository.findOne(submission.getExercise().getId());
    	Exam examToUpdate = examRepository.findById(submission.getExercise().getExam().getId());
    	
    	if (submission.getStatus().equals("O")) exerciseToUpdate.setProgress(exerciseToUpdate.getProgress() + 1);
    	
    	if (exerciseToUpdate.getProgress() == exerciseToUpdate.getNsubmissions()){
    		exerciseToUpdate.setStatus("C");
    		
    		examToUpdate.setProgress(examToUpdate.getProgress() + 1);
    		if (examToUpdate.getProgress() == examToUpdate.getNquestions()){
    			examToUpdate.setStatus("C");
    		}
    	}
    	
    	exerciseRepository.save(exerciseToUpdate);
    	examRepository.save(examToUpdate);
    }

		
	@Override
	public void validateSubmissionFile(InputStream file, Long examID) {
		Exam exam = this.examRepository.findById(examID);
		if (exam == null)
			return;
		List<Student> listOfStudents = new ArrayList<Student>();

		try {

			ZipInputStream zipIn = new ZipInputStream(file);
			ZipEntry entry = zipIn.getNextEntry();
			String studentUsername = "none";

			// for each file
			while (entry != null) {
				// divide in name and exercise
				String[] list = divideFileName(entry.getName());
				// get code content
				StringBuilder sb = new StringBuilder();
				for (int c = zipIn.read(); c != -1; c = zipIn.read()) {
					sb.append((char) c);
				}

				if (!list[0].isEmpty() && !list[1].isEmpty()) {
					studentUsername = list[1];
					// check if student is present at exam
					Student stu = exam.getStudentByName(studentUsername);
					if (stu == null) {
						// create student
						stu = new Student("no-name", studentUsername);
					}
					listOfStudents.add(stu);

				}
				zipIn.closeEntry();
				entry = zipIn.getNextEntry();
			}
			zipIn.close();
			this.examService.assign_students(exam.getId(), listOfStudents);
			System.out.println("---done!--");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return;
		}
	}

	
	@Async
	@Override
	public void analyseCode(InputStream file, Long examID) {

		Exam exam = this.examRepository.findById(examID);
		Map<Exercise, List<Submission>> submissions = new HashMap<Exercise, List<Submission>>();

		if (exam == null)
			return;

		try {

			ZipInputStream zipIn = new ZipInputStream(file);
			ZipEntry entry = zipIn.getNextEntry();
			String studentUsername = "none";
			String exerciseName = "none";
			String code = "none";
			String[] list = new String[2];
			// for each file
			while (entry != null) {
				// divide in name and exercise
				list = divideFileName(entry.getName());
				// get code content
				StringBuilder sb = new StringBuilder();
				for (int c = zipIn.read(); c != -1; c = zipIn.read()) {
					sb.append((char) c);
				}
				code = sb.toString();
				if (!list[0].isEmpty() && !list[1].isEmpty()) {
					studentUsername = list[1];
					exerciseName = list[0];
					// check if student is present at exam
					Student d = exam.getStudentByName(studentUsername);
					Exercise e = exam.getExerciseByName(exerciseName);
					// if exercise found
					if (d != null && e != null) {
						// compile and execute
						Submission submission = generateSubmission(code, e, d);
						if (submission != null) {
							addToMap(submissions, e, submission);
						}
					}
				}
				zipIn.closeEntry();
				entry = zipIn.getNextEntry();
			}
			zipIn.close();
			System.out.println("---done analyzing the code---");
			System.out.println("---saving on DB---");
			addSubmissionsToExam(submissions, exam);
			System.out.println("---saved---");

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return;
		}
	}

	private void addToMap(Map<Exercise, List<Submission>> submissions, Exercise e, Submission s) {
		if (submissions.get(e) == null) {
			submissions.put(e, new ArrayList<Submission>());
		}
		submissions.get(e).add(s);
	}

	private boolean addSubmissionsToExam(Map<Exercise, List<Submission>> submissions, Exam exam) {
		// try {
		for (Map.Entry<Exercise, List<Submission>> entry : submissions.entrySet()) {
			exam.updateExamSubmission(entry.getKey(), entry.getValue());
		}
		this.examRepository.save(exam);

		/*
		 * } catch (Exception ex) { return false; }
		 */
		return true;
	}

	@Override
	public boolean isOSLinux() {
		String os = System.getProperty("os.name");
		if (!os.contains("Linux")) {
			System.out.println("os is not linux! \n cannot compile!");
			return false;
		}
		return true;
	}

	
	private Submission generateSubmission(String code, Exercise exe, Student stu)
			throws FileNotFoundException, UnsupportedEncodingException {
		String output = "";

		boolean compilationError = true;

		try {
			// create dedicated directory
			String dirPath = "/tmp/" + stu.getUsername() + "_";
			dirPath += new SimpleDateFormat("yyyyMMdd_HHmmss").format(Calendar.getInstance().getTime());
			// creating dir
			// System.out.println("---creating dir---");
			new File(dirPath).mkdir();

			// write file with code
			// System.out.println("---writing file!---");
			// TODO - change main.c to a variable from the user!
			PrintWriter writer = new PrintWriter(dirPath + "/main.c", "UTF-8");
			writer.println(code);
			writer.close();
			// System.out.println(code);

			// get Library
			// System.out.println("---searching for Library---");
			if (!moveLibraryContent(exe, dirPath)) {
				System.out.println("#### library Not Found " + exe + " ###");
				return null;
			}

			// compile
			// System.out.println("---compiling---");
			String[] compilationMessage = executeCommand(" (cd " + dirPath + " ; " + exe.getCommandbuild() + ")");

			if (compilationMessage != null && (compilationMessage[1] == null || compilationMessage[1].isEmpty())) {
				compilationError = false;
				// execute
				// System.out.println("---executing---");
				compilationMessage = executeCommand("(cd " + dirPath + " ; " + exe.getCommandrun() + ")");

				if (compilationMessage == null) {
					System.out.println("### error in execution ###");
				}

			} else {
				System.out.println("### error in compilation: " + compilationMessage[1] + " ###");
			}

			// remove dedicated directory
			String[] tmp = executeCommand("rm -r " + dirPath);
			if (!(tmp != null && (tmp[1] == null || tmp[1].isEmpty())))
				System.out.println("ERROR: removing dedicated directory");
			if (compilationError) {
				output = "---[COMPILATION ERROR]---\n" + compilationMessage[1];
			} else {
				if (compilationMessage != null && compilationMessage[1] != null && !compilationMessage[1].isEmpty()) {
					output = "---[EXECUTION ERROR]---\n" + compilationMessage[1];
				} else {
					output = "---[EXECUTION OUTPUT]---\n" + compilationMessage[0];
				}
			}

			return new Submission(code, output, exe, stu);

		} catch (IOException e) {
			e.printStackTrace();
		}

		return null;
	}

	private final boolean moveLibraryContent(Exercise exe, String destinationPath) throws IOException {
		File folder = new File(exe.getPath());
		File bfile = new File(destinationPath);

		File[] listOfFiles = folder.listFiles();
		if (listOfFiles == null) {
			System.out.println("---Library Not Found---");
			return false;
		}
		for (int i = 0; i < listOfFiles.length; i++) {
			if (listOfFiles[i].isFile()) {
				bfile = new File(destinationPath + "/" + listOfFiles[i].getName());
				FileInputStream input = new FileInputStream(listOfFiles[i]);
				FileOutputStream output = new FileOutputStream(bfile);
				FileChannel src = input.getChannel();
				FileChannel dest = output.getChannel();
				dest.transferFrom(src, 0, src.size());
				input.close();
				output.close();
			}
		}
		return true;
	}

	
	private final String[] executeCommand(String command) throws IOException {
		String[] output = new String[2];
		Runtime rt = Runtime.getRuntime();
		String[] commands = { "/bin/bash", "-c", command };
		for (String s : commands) {
			System.out.print(s + " ");
		}

		Process proc = rt.exec(commands);

		BufferedReader stdInput = new BufferedReader(new InputStreamReader(proc.getInputStream()));
		BufferedReader stdError = new BufferedReader(new InputStreamReader(proc.getErrorStream()));

		// read the output from the command
		String s = new String();
		output[0] = "";
		output[1] = "";
		while ((s = stdInput.readLine()) != null) {
			output[0] += s;
		}

		// read any errors from the attempted command
		while ((s = stdError.readLine()) != null) {
			if (s.compareToIgnoreCase("null") != 0) {
				output[1] += s;
			}
		}
		return output;
	}

	private String[] divideFileName(String fileName) {

		String[] out = new String[2];
		Matcher matcher = Pattern.compile("^[A-Za-z0-9]+").matcher(fileName);

		if (fileName != null && !fileName.isEmpty() && matcher.find() && fileName.contains("_")) {
			out[0] = fileName.substring(fileName.indexOf("_") + 1);
			out[1] = matcher.group(0);
			if (!out[0].isEmpty() && out[0].indexOf(".") != -1)
				out[0] = out[0].substring(0, out[0].indexOf("."));
		}
		return out;
	}

}
