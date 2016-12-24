package org.evaluator.ws.service;

import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.EntityExistsException;
import javax.persistence.NoResultException;

import org.evaluator.ws.model.Examiner;
import org.evaluator.ws.model.Role;
import org.evaluator.ws.repository.ExaminerRepository;
import org.evaluator.ws.repository.RoleRepository;
import org.evaluator.ws.util.BCryptPasswordEncoderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * The ExaminerServiceBean encapsulates all business behaviors for operations on
 * the Examiner entity
 * 
 * @author Manuel Zamith
 */
@Service
public class ExaminerServiceBean implements ExaminerService {

	/**
	 * The Logger for this class.
	 */
	private Logger logger = LoggerFactory.getLogger(this.getClass());

	/**
	 * The Spring Data repository for Examniner entities.
	 */
	@Autowired
	private ExaminerRepository examinerRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Override
	public Examiner findByUsername(String username) {
		logger.info("> findExaminerByUsername");
		Examiner examiner = examinerRepository.findByUsername(username);

		logger.info("< findExaminerByUsername");
		return examiner;
	}

	@Override
	public Collection<Examiner> findAll() {
		logger.info("> findAllExaminer");
		Collection<Examiner> examiners = examinerRepository.findAll();

		logger.info("< findAllExaminer");
		return examiners;
	}

	@Override
	public Examiner findOne(Long id) {
		logger.info("> findOne id:{}", id);

		Examiner examiner = examinerRepository.findOne(id);

		logger.info("< findOne id:{}", id);
		return examiner;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public Examiner create(Examiner examiner) {
		logger.info("> createExaminer");

		// Ensure the entity object to be created does NOT exist in the
		// repository. Prevent the default behavior of save() which will update
		// an existing entity if the entity matching the supplied id exists.
		if (examiner.getId() != null) {
			// Cannot create Exam with specified ID value
			logger.error("Attempted to create a Exam, but id attribute was not null.");
			throw new EntityExistsException("The id attribute must be null to persist a new entity.");
		}

		// Make Sure account is OK and Encrypt Password
		examiner = this.setUpAccount(examiner);

		Examiner savedExaminer = examinerRepository.save(examiner);

		logger.info("< createExaminer");
		return savedExaminer;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void delete(Long id) {

		logger.info("> delete id:{}", id);

		examinerRepository.delete(id);

		logger.info("< delete id:{}", id);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public Examiner update(Examiner examiner) {
		logger.info("> update id:{}", examiner.getId());

		// Ensure the entity object to be updated exists in the repository to
		// prevent the default behavior of save() which will persist a new
		// entity if the entity matching the id does not exist
		Examiner examinerToUpdate = findOne(examiner.getId());
		if (examinerToUpdate == null) {
			// Cannot update Greeting that hasn't been persisted
			logger.error("Attempted to update an examiner, but the entity does not exist.");
			throw new NoResultException("Requested entity not found.");
		}

		examinerToUpdate = this.createNewExaminer(examinerToUpdate, examiner);
		Examiner updatedExaminer = examinerRepository.save(examinerToUpdate);

		logger.info("< update id:{}", examiner.getId());
		return updatedExaminer;
	}

	private Examiner setUpAccount(Examiner examiner) {

		examiner.getAccount().setCreatedAt(new Date());
		examiner.getAccount().setUsername(examiner.getUsername());

		String pw = examiner.getAccount().getPassword();

		BCryptPasswordEncoderUtil a = new BCryptPasswordEncoderUtil();
		examiner.getAccount().setPassword(a.encode(pw));

		Set<Role> roles = new HashSet<Role>();
		roles.add(roleRepository.findByCodeAndEffective("ROLE_USER", new Date()));

		examiner.getAccount().setRoles(roles);

		return examiner;
	}

	private Examiner createNewExaminer(Examiner examinerToUpdate, Examiner examiner) {

		examinerToUpdate.setName(examiner.getName());
		examinerToUpdate.setUsername(examiner.getUsername());
		examinerToUpdate.setEmail(examiner.getEmail());

		examinerToUpdate.getAccount().setUsername(examiner.getUsername());

		if (!examinerToUpdate.getAccount().getPassword().equals(examiner.getAccount().getPassword())) {
			BCryptPasswordEncoderUtil a = new BCryptPasswordEncoderUtil();
			examinerToUpdate.getAccount().setPassword(a.encode(examiner.getAccount().getPassword()));
		}

		return examinerToUpdate;
	}

}
