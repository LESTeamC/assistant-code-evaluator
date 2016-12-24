package org.evaluator.ws.web.api;

import org.evaluator.ws.service.SubmissionService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

import org.evaluator.ws.repository.ExerciseRepository;
import javax.servlet.http.HttpServletRequest;

/**
 * 
 * The UploadFile class is a RESTful web service controller. It handles requests
 * related to Multipart File Upload
 * 
 * @author Ricardo Caldas
 * @author Paulo Barbosa
 */

@RestController
public class UploadFile {

	@Autowired
	private SubmissionService submissionService;

	@Autowired
	ExerciseRepository exerciseRepository;

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	// Const that has the folder direction
	private static final String destDirectory = "/home/itporto/ace/";
	public String[] exerciceName = new String[50];
	public Long[] examId = new Long[50];

	// Receive a POST
	/**
	 * US 8.7 - Import Exercise Libraries
	 * 
	 * @param files Array of Multipart Files
	 * @param request http Request
	 */
	@RequestMapping(value = "/api/uptest", 
			method = RequestMethod.POST)
	public @ResponseBody String multipleSave(@RequestParam("uploadfile") MultipartFile[] files,
			HttpServletRequest request) { // Receive an Array Multipart with
											// files.
		String fileName = null;
		String msg = "";

		// Token Hanlder

		try {
			// Manage to get the Tokens ID
			StringBuffer requestURL = request.getRequestURL();
			System.out.println(requestURL);
			String queryString = request.getQueryString();
			String token = requestURL.append('?').append(queryString).toString();
			System.out.println(token);
			String result[] = token.split("=");
			String returnValue = result[result.length - 1];
			System.out.println(returnValue);
			// Split the token and save it on a Array
			String[] b = returnValue.split("_");

			for (int i = 0; i < b.length; i++) {
				Long converter = Long.parseLong(b[i]);
				examId[i] = converter; // Array with all exam ids as long
			}

		} finally {

		}

		if (files != null && files.length > 0) {

			for (int b = 0; b < files.length; b++) {
				try {
					fileName = files[b].getOriginalFilename();

					byte[] bytes = files[b].getBytes();
					BufferedOutputStream buffStream =
							// Create a buffer of Bytes and save it to disk
							// Location
							// This file location should be changed when you
							// install in your computer
							new BufferedOutputStream(new FileOutputStream(new File("//home//itporto/ace/" + fileName)));
					buffStream.write(bytes);
					buffStream.close();

					msg += "You have successfully uploaded " + fileName + "<br/>";

					String zipFilePath = destDirectory + fileName;

					String fileFolder = fileName.substring(0, fileName.lastIndexOf('.'));
					String newFolderName = String.valueOf(examId[b]);
					UnzipFile unzipper = new UnzipFile();

					try {
						unzipper.unzip(zipFilePath, destDirectory, fileFolder, newFolderName, exerciseRepository);

					} catch (Exception ex) {
						// some errors occurred
						ex.printStackTrace();
					}

					// /opt/ace
				} catch (Exception e) {
					logger.error(e.getMessage() + e.toString());
				}
			}
			return msg;
		} else {
			return "Unable to upload. File is empty.";
		}
	}

	/**
	 * US 4.1 - Import Submissions
	 * 
	 * @param file Multipart File with the Submissions
	 * @param exam_id Id of the Exam
	 * @throws IOException
	 */
	@RequestMapping(value = "/api/students_submissions/{exam_id}", method = RequestMethod.POST)
	public @ResponseBody ResponseEntity<String> importStudentsSubmission(@RequestParam("uploadfile") MultipartFile file,
			@PathVariable("exam_id") Long exam_id) throws IOException {

		if (file == null)
			return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
		
		// First, we analyse the Submission Files
		this.submissionService.validateSubmissionFile(file.getInputStream(), exam_id);
		
		//Code compilation and Execution
		this.submissionService.analyseCode(file.getInputStream(), exam_id);

		return ResponseEntity.ok("SUCCESS!");
	}
}
