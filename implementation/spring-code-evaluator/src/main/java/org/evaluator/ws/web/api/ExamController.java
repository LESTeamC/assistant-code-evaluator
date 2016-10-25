package org.evaluator.ws.web.api;

import java.util.Collection;

import org.evaluator.ws.model.Exam;
import org.evaluator.ws.service.ExamService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ExamController extends BaseController {

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private ExamService examService;
	
    @RequestMapping(
            value = "/api/exams/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Exam> getExam(@PathVariable("id") Long id) {
        logger.info("> getExam id:{}", id);

        Exam exam = examService.findById(id);
        if (exam == null) {
            return new ResponseEntity<Exam>(HttpStatus.NOT_FOUND);
        }

        logger.info("< getGreeting id:{}", id);
        return new ResponseEntity<Exam>(exam, HttpStatus.OK);
    }

}
