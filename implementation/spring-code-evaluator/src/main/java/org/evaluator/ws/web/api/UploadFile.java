package org.evaluator.ws.web.api;

import org.evaluator.ws.service.SubmissionService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.annotation.MultipartConfig;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import ch.qos.logback.core.rolling.helper.IntegerTokenConverter;
import org.evaluator.ws.model.Exercise;
import org.evaluator.ws.repository.ExerciseRepository;
import org.evaluator.ws.util.RequestContext;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;


/**
 * Created by Ricardo on 25/11/2016.
 */

@RestController
public class UploadFile {

    @Autowired
    private SubmissionService submissionService;
    
    @Autowired ExerciseRepository exerciseRepository;
    
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    
    //Const that has the folder direction
    private static final String destDirectory = "/home/itporto/ace/";
    public String[] exerciceName = new String[50];
    public Long[] examId = new Long[50];




    //Receive a POST
    @RequestMapping(value = "/api/uptest", method = RequestMethod.POST)
    public @ResponseBody
    String multipleSave(@RequestParam("uploadfile") MultipartFile[] files, HttpServletRequest request) { //Receive an Array Multipart with files.
        String fileName = null;
        String msg = "";

        //Token Hanlder
        
        try {
            //Manage to get the Tokens ID
            StringBuffer requestURL = request.getRequestURL();
            System.out.println(requestURL);
            String queryString = request.getQueryString();
            String token = requestURL.append('?').append(queryString).toString();
            System.out.println(token);
            String result[] = token.split("=");
            String returnValue = result[result.length - 1];
            System.out.println(returnValue);
            //Split the token and save it on a Array
            String[] b = returnValue.split("_");

            //Long[] examId = new Long[50];
            //Convert String to Long Id


            for (int i = 0; i < b.length; i++) {
                Long converter = Long.parseLong(b[i]);
                examId[i] = converter;  //Array with all exam ids as long
            }

            //String[] exerciceName = new String[50];
            //Gets the Ids and search for the exam name according to its iD.
            //  for (int i = 0 ; i <= examId.length-1; i++){

            //    if (examId[i] != null){
            //        Exercise exercise = exerciseRepository.findOne(examId[i]);
            //         exerciceName[i] = exercise.getName();
            //          System.out.println(exercise.getName().toString());
            //     }
            // }

        } finally {

        }


   //     for (int i = 0; i <= examId.length - 1; i++) {

     //       if (examId[i] != null) {

                if (files != null && files.length > 0) {

                    for (int b = 0; b < files.length; b++) {
                        try {
                            fileName = files[b].getOriginalFilename();
                            
                            byte[] bytes = files[b].getBytes();
                            BufferedOutputStream buffStream =
                                    //Create a buffer of Bytes and save it to disk Location
                                    //This file location should be changed when you install in your computer
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
         //   }
       // }
        //return fileName;
    }



        @RequestMapping(value = "/api/students_submissions/{exam_id}", method = RequestMethod.POST)
        public @ResponseBody ResponseEntity<String> importStudentsSubmission(@RequestParam("uploadfile") MultipartFile file,
                @PathVariable("exam_id") Long exam_id) throws IOException {

            if (file == null)
                return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
            this.submissionService.validateSubmissionFile(file.getInputStream(), exam_id);
            this.submissionService.analyseCode(file.getInputStream(), exam_id);

            return ResponseEntity.ok("SUCCESS!");
        }
    }
