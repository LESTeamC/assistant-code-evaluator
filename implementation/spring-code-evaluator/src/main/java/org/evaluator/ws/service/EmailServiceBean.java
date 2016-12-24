package org.evaluator.ws.service;

import javax.mail.MessagingException;
import org.evaluator.ws.web.api.SendEmail;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 * The EmailServiceBean implements all business behaviors defined by the
 * EmailService interface.
 * 
 * @author Manuel Zamith
 */
@Service
public class EmailServiceBean implements EmailService {

    /**
     * The Logger for this class.
     */
    private Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private SendEmail sendEmail;
    
    @Override
    public Boolean send(String to, String username, String password) throws MessagingException {
        logger.info("> send");

        Boolean success = Boolean.FALSE;

        try {
        	sendEmail.send(to,"Assistant Code Evaluator", username, password);
        	
        } catch (Exception e) {
        	
        	logger.error("Failed to Send Email");
            // do nothing
        }

        success = Boolean.TRUE;

        logger.info("< send");
        return success;
    }

    @Async
    @Override
    public void sendAsync(String to, String username, String password) {
        logger.info("> sendAsync");

        try {
            send(to, username, password);
        } catch (Exception e) {
            logger.warn("Exception caught sending asynchronous mail.", e);
        }

        logger.info("< sendAsync");
    }

}