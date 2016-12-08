package org.evaluator.ws.web.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

/**
 * Created by Ricardo on 05/12/2016.
 */

@Component
public class SendEmail {

    @Autowired
    private JavaMailSender javaMailSender;

    public void send(String to, String subject, String username, String password) throws MessagingException {


        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper;

        helper = new MimeMessageHelper(message, true);
        helper.setSubject(subject);
        helper.setTo(to);
        helper.setText("<style type=\"text/css\">\n" +
                ".tg  {border-collapse:collapse;border-spacing:0;}\n" +
                ".tg td{font-family:Arial, sans-serif;font-size:17px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}\n" +
                ".tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}\n" +
                ".tg .tg-s6z2{text-align:center;border-style:none}\n" +
                ".tg .tg-s6z2logo{text-align:center; background-color: silver;border-style:none}\n" +
                ".tg .tg-s6z2gray{text-align:center; background-color: silver;border-style:none}\n" +
                ".tg .tg-baqh{text-align:center;vertical-align:top;border-style:none}\n" +
                ".tg .tg-baqhpass{text-align:center;vertical-align:top;border-style:none;background-color: silver}\n" +
                "</style>\n" +
                "<table class=\"tg\">\n" +
                "  <tr>\n" +
                "    <th class=\"tg-s6z2\"></th>\n" +
                "    <th class=\"tg-s6z2logo\" colspan=\"3\"><a href='https://postimg.org/image/89sru8f97/' target='_blank'><img src='https://s17.postimg.org/89sru8f97/ACE_Logo.png' border='0' alt='postimage'/></a></th>\n" +
                "    <th class=\"tg-baqh\"></th>\n" +
                "  </tr>\n" +
                "  <tr>\n" +
                "    <td class=\"tg-s6z2\"></td>\n" +
                "    <td class=\"tg-s6z2\" colspan=\"3\">Hi there!<br>Welcome to Assistant Code Evaluator <br/><br/><br/>\tWe are happy to inform you that your login information has been updated</td>\n" +
                "    <td class=\"tg-baqh\"></td>\n" +
                "  </tr>\n" +
                "  <tr>\n" +
                "    <td class=\"tg-s6z2\"></td>\n" +
                "    <td class=\"tg-s6z2gray\" colspan=\"3\">Username<br/><br/>"+username+"</td>\n" +
                "    <td class=\"tg-baqh\"></td>\n" +
                "  </tr>\n" +
                "  <tr>\n" +
                "    <td class=\"tg-baqh\"></td>\n" +
                "    <td class=\"tg-baqhpass\" colspan=\"3\"><br/><br/>Password<br/><br/>"+password+"<br/></td>\n" +
                "    <td class=\"tg-baqh\"></td>\n" +
                "  </tr>\n" +
                "  <tr>\n" +
                "    <td class=\"tg-baqh\" colspan=\"5\"><br/><br/><br/><br/><br/>For more info about Assistante Code Evaluator <br/> contact our administrator at <br/><br/> assistantcodevaluator@gmail.com</td>\n" +
                "  </tr>\n" +
                "</table>", true);

        javaMailSender.send(message);


    }
}
