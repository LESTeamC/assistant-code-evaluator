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

    public String filenameZip, directoryZip;

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
                            new BufferedOutputStream(new FileOutputStream(new File("C://Develop//files//" + fileName)));
                    buffStream.write(bytes);
                    buffStream.close();
                    msg += "You have successfully uploaded " + fileName +"<br/>";

                    //Unzip FIle
                    filenameZip = "c:/Develop/files/"+fileName;
                    directoryZip = "c:/Develop/files";
                    unzip(filenameZip, directoryZip);
                } catch (Exception e) {
                    return "You failed to upload " + fileName + ": " + e.getMessage() +"<br/>";
                }
            }
            return msg;
        } else {
            return "Unable to upload. File is empty.";
        }
    }




    //SimpleFile Unzip
    public static void unzip(String zipFilePath, String destDir) {
        File dir = new File(destDir);
        // create output directory if it doesn't exist
        if(!dir.exists()) dir.mkdirs();
        FileInputStream fis;
        //buffer for read and write data to file
        byte[] buffer = new byte[1024];
        try {
            fis = new FileInputStream(zipFilePath);
            ZipInputStream zis = new ZipInputStream(fis);
            ZipEntry ze = zis.getNextEntry();
            while(ze != null){
                String fileName = ze.getName();
                File newFile = new File(destDir + File.separator + fileName);
                System.out.println("Unzipping to "+newFile.getAbsolutePath());
                //create directories for sub directories in zip
                new File(newFile.getParent()).mkdirs();
                FileOutputStream fos = new FileOutputStream(newFile);
                int len;
                while ((len = zis.read(buffer)) > 0) {
                    fos.write(buffer, 0, len);
                }
                fos.close();
                //close this ZipEntry
                zis.closeEntry();
                ze = zis.getNextEntry();
            }
            //close last ZipEntry
            zis.closeEntry();
            zis.close();
            fis.close();


            File f = new File(zipFilePath);
            f.delete();

        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
