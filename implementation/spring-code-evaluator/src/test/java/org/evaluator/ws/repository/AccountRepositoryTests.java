package org.evaluator.ws.repository;

import java.util.Collection;

import org.evaluator.ws.AbstractTest;
import org.evaluator.ws.model.Account;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

/**
 * Unit tests for the AccountRepository interface.
 * 
 * @author Manuel Zamith
 *
 */
@Transactional
public class AccountRepositoryTests extends AbstractTest {

	@Autowired
	private AccountRepository repository;

	@Test
	public void testFindByUsername() {

		String username = "user";

		Account entity = repository.findByUsername(username);

		Assert.assertNotNull("failure - expected entity not null", entity);
		Assert.assertEquals("failure - expected username attribute match", username, entity.getUsername());

	}

	@Test
	public void testFindByUsernameLike() {

		String username = "er";

		Collection<Account> list = repository
				.findByUsernameContainingIgnoreCaseAndEnabledTrueOrderByUsernameAsc(username);

		Assert.assertNotNull("failure - expected list not null", list);

	}

	@Test
	public void testFindByUsernameLikeMixedCase() {

		String username = "eR";

		Collection<Account> list = repository
				.findByUsernameContainingIgnoreCaseAndEnabledTrueOrderByUsernameAsc(username);

		Assert.assertNotNull("failure - expected list not null", list);

	}

	@Test
	public void testFindByUsernameLikeMixedCaseSingleResult() {

		String username = "UsEr";

		Collection<Account> list = repository
				.findByUsernameContainingIgnoreCaseAndEnabledTrueOrderByUsernameAsc(username);

		Assert.assertNotNull("failure - expected list not null", list);

	}
	
    @Test
    public void testFindByUsernameQuery() {

        String username = "user";

        Account entity = repository.findByUsernameQuery(username);

        Assert.assertNotNull("failure - expected entity not null", entity);
        Assert.assertEquals("failure - expected username attribute match",
                username, entity.getUsername());

    }

    @Test
    public void testFindAllEnabledLikeUsernameQuery() {

        String username = "%er%";

        Collection<Account> list = repository
                .findAllEnabledLikeUsernameQuery(username);

        Assert.assertNotNull("failure - expected list not null", list);

    }

    @Test
    public void testFindAllEnabledLikeUsernameQueryMixedCase() {

        String username = "%eR%";

        Collection<Account> list = repository
                .findAllEnabledLikeUsernameQuery(username);

        Assert.assertNotNull("failure - expected list not null", list);

    }

    @Test
    public void testFindAllEnabledLikeUsernameQueryMixedCaseSingleResult() {

        String username = "%UsEr%";

        Collection<Account> list = repository
                .findAllEnabledLikeUsernameQuery(username);

        Assert.assertNotNull("failure - expected list not null", list);

    }

	

}