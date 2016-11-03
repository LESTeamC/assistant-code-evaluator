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

@RestController

public class LoginController extends BaseController {
	
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	
	@Autowired
	private AccountService accountService;
	
	@RequestMapping(
			value = "/api/login",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Account> getAccount(@RequestParam(value="username") String username){
		
		logger.info("> getAccount");
		
		Account account = accountService.findByUsername(username);
		return new ResponseEntity<Account>(account, HttpStatus.ACCEPTED);
	}
	
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
