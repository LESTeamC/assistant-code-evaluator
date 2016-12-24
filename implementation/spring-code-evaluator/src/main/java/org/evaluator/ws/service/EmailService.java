
package org.evaluator.ws.service;

import javax.mail.MessagingException;

/**
 * The EmailService interface defines all public business behaviors for
 * composing and transmitting email messages.
 * 
 * This interface should be injected into EmailService clients, not the
 * implementation bean.
 * 
 * @author Manuel Zamith
 */
public interface EmailService {

    /**
     * Send  email synchronously.
     * @param greeting email data to send
     * @return A Boolean whose value is TRUE if sent successfully; otherwise
     *         FALSE.
     */
    Boolean send(String to, String username, String password) throws MessagingException;

    /**
     * Send a Greeting via email asynchronously.
     * @param greeting A Greeting to send.
     */
    void sendAsync(String to, String username, String password);

    /**
     * Send a Greeting via email asynchronously. Returns a Future&lt;Boolean&gt;
     * response allowing the client to obtain the status of the operation once
     * it is completed.
     * @param greeting A Greeting to send.
     * @return A Future&lt;Boolean&gt; whose value is TRUE if sent successfully;
     *         otherwise, FALSE.
     */
//    Future<Boolean> sendAsyncWithResult(Greeting greeting);

}