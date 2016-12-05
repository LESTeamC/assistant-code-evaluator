package org.evaluator.ws.web.api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
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

/**
 * Created by Ricardo on 25/11/2016.
 */

@RestController
public class UploadFile {

    
    //Receive a POST
    @RequestMapping(value = "/api/uptest", method = RequestMethod.POST)
    public @ResponseBody
    String multipleSave(@RequestParam("uploadfile") MultipartFile[] files){ //Receive an Array Multipart with files.
        String fileName = null;
        String msg = "";
        if (files != null && files.length >0) { //Runs the array getting the size and each file
            for(int i =0 ;i< files.length; i++){
                try {
                    fileName = files[i].getOriginalFilename();
                    byte[] bytes = files[i].getBytes();
                    BufferedOutputStream buffStream =
                            //Create a buffer of Bytes and save it to disk Location
                            //This file location should be changed when you install in your computer
                            new BufferedOutputStream(new FileOutputStream(new File("C://Develop//files//"+ fileName)));
                    buffStream.write(bytes);
                    buffStream.close();

                    msg += "You have successfully uploaded " + fileName +"<br/>";

                    String zipFilePath = "c:/Develop/Files/"+fileName;
                    String destDirectory = "c:/Develop/files/";
                    String fileFolder = fileName.substring(0, fileName.lastIndexOf('.'));;

                    UnzipFile unzipper = new UnzipFile();
                    try {
                        unzipper.unzip(zipFilePath, destDirectory, fileFolder);
                    } catch (Exception ex) {
                        // some errors occurred
                        ex.printStackTrace();
                    }


                } catch (Exception e) {
                    return "You failed to upload " + fileName + ": " + e.getMessage() +"<br/>";
                }
            }
            return msg;
        } else {
            return "Unable to upload. File is empty.";
        }
    }
}