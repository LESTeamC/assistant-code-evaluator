package org.evaluator.ws.web.api;

import org.evaluator.ws.model.Exercise;
import org.evaluator.ws.repository.ExerciseRepository;
import org.evaluator.ws.service.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Controller;

import java.io.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

/**
 * Created by Ricardo on 01/12/2016.
 */
@Controller
public class UnzipFile {

    private static final int BUFFER_SIZE = 4096;
    public String folderName;

    /**
     * Extracts a zip file specified by the zipFilePath to a directory specified by
     * destDirectory (will be created if does not exists)
     * @param zipFilePath
     * @param destDirectory
     * @throws IOException
     */


    @Async
    public void unzip(String zipFilePath, String destDirectory, String fileFolder, String newFolderName, ExerciseRepository exerciseRepository) throws IOException {

        folderName = newFolderName;

        File destDir = new File(destDirectory + fileFolder);
        if (!destDir.exists()) {
            destDir.mkdir();
        }
        ZipInputStream zipIn = new ZipInputStream(new FileInputStream(zipFilePath));
        ZipEntry entry = zipIn.getNextEntry();
        // iterates over entries in the zip file
        while (entry != null) {
            String filePath = destDirectory + entry.getName();  //+ File.separator

            if (!entry.isDirectory()) {
                // if the entry is a file, extracts it
                extractFile(zipIn, filePath);
            } else {
                // if the entry is a directory, make the directory
                File dir = new File(filePath);
                dir.mkdir();
            }
            zipIn.closeEntry();
            entry = zipIn.getNextEntry();
        }

        Exercise exercise = exerciseRepository.findOne(Long.parseLong(folderName));
        exercise.setPath(destDirectory + "/" + fileFolder);
        exerciseRepository.save(exercise);


        //File newName = new File("C://Develop//files//"+folderName);
        //destDir.renameTo(newName);
        zipIn.close();
    }



    /**
     * Extracts a zip entry (file entry)
     * @param zipIn
     * @param filePath
     * @throws IOException
     */

    private void extractFile(ZipInputStream zipIn, String filePath) throws IOException {
        BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(filePath));
        byte[] bytesIn = new byte[BUFFER_SIZE];
        int read = 0;
        while ((read = zipIn.read(bytesIn)) != -1) {
            bos.write(bytesIn, 0, read);
        }
        bos.close();
    }
}
