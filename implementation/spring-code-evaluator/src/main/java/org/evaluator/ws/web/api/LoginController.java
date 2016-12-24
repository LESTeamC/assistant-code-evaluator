package org.evaluator.ws.web.api;

import org.evaluator.ws.model.Account;
import org.evaluator.ws.service.AccountService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * The LogingController class is a RESTful web service controller.
 * It handles requests related to the Login Module
 * 
 * @author Manuel Zamith
 */
@RestController
public class LoginController extends BaseController {
	
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	private AccountService accountService;
	
	
    /**
     * US 1.1 - Examiner Login
     * 
     * Web service endpoint to fetch an Account given a username
     * To perform login, we make a simple get request to the API as to fetch an account with the given username
     * If the requests gets by Basic Auth and the account exists, the user can safely log in
     * For examiner login we use the /api endpoint which can be accessed by USER and SYSADMIN
     * 
     * @param username Examiner username
     * @return A ResponseEntity containing Account
     */
	@RequestMapping(
			value = "/api/login",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Account> getAccount(@RequestParam(value="username") String username){
		
		logger.info("> getAccount");
		
		Account account = accountService.findByUsername(username);
		return new ResponseEntity<Account>(account, HttpStatus.ACCEPTED);
	}
	
    /**
     * US 2.1 - Admin Login
     * 
     * Web service endpoint to fetch an Account given a username
     * To perform login, we make a simple get request to the API as to fetch an account with the given username
     * If the requests gets by Basic Auth and the account exists, the user can safely log in
     * For examiner login we use the /admin endpoint which can be accessed only by SYSADMIN.
     * 
     * @param username Examiner username
     * @return A ResponseEntity containing Account
     */
	@RequestMapping(
			value = "/admin/login",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Account> getAdminAccount(@RequestParam(value="username") String username){
		
		logger.info("> getAdminAccount");
		
		Account account = accountService.findByUsername(username);
		return new ResponseEntity<Account>(account, HttpStatus.ACCEPTED);
	}

}
