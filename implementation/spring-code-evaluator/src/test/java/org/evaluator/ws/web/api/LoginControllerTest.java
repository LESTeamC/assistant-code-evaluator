package org.evaluator.ws.web.api;


import org.evaluator.ws.AbstractControllerTest;
import org.evaluator.ws.model.Account;
import org.evaluator.ws.model.Role;
import org.evaluator.ws.service.AccountService;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.annotation.Transactional;


/**
 * Unit tests for the LoginController using Spring MVC Mocks.
 * 
 * These tests utilize the Spring MVC Mock objects to simulate sending actual
 * HTTP requests to the Controller component. This test ensures that the
 * RequestMappings are configured correctly. Also, these tests ensure that the
 * request and response bodies are serialized as expected.
 * 
 * @author Manuel Zamith
 */
@Transactional
public class LoginControllerTest extends AbstractControllerTest {

    @Autowired
    private AccountService accountService;
    
    @Before
    public void setUp() {
        super.setUp();
    }
    
    @Test
    public void testGetAccount() throws Exception {
    	
    	String user = "user";

        String uri = "/api/login?username=" + user;

        MvcResult result = mvc.perform(MockMvcRequestBuilders.get(uri)
                .accept(MediaType.APPLICATION_JSON)).andReturn();
        
        Account account = accountService.findByUsername(user);
        Role role = (Role)account.getRoles().toArray()[0];
        
        String content = result.getResponse().getContentAsString();
        int status = result.getResponse().getStatus();

        Assert.assertEquals("failure - expected HTTP status", 202, status);
        Assert.assertTrue(
                "failure - expected HTTP response body to have a value",
                content.trim().length() > 0);
        Assert.assertEquals("failure - expected tole for user", role.getLabel(), "User");


    }
    
    @Test
    public void testGetAccountAdmin() throws Exception {

    	String user = "operations";

        String uri = "/admin/login?username=" + user;

        MvcResult result = mvc.perform(MockMvcRequestBuilders.get(uri)
                .accept(MediaType.APPLICATION_JSON)).andReturn();
        
        Account account = accountService.findByUsername(user);
        Role role = (Role)account.getRoles().toArray()[0];

        String content = result.getResponse().getContentAsString();
        int status = result.getResponse().getStatus();

        Assert.assertEquals("failure - expected HTTP status", 202, status);
        Assert.assertTrue(
                "failure - expected HTTP response body to have a value",
                content.trim().length() > 0);
        Assert.assertEquals("failure - expected tole for user", role.getLabel(), "System Admin");


    }

}
