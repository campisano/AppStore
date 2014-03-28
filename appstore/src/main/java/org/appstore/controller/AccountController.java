package org.appstore.controller;

import java.util.Random;

import org.appstore.common.OperationResult;
import org.appstore.common.OperationResultObject;
import org.appstore.domain.AccountRepository;
import org.appstore.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AccountController {
	@Autowired
	AccountRepository accountRepository;

	public OperationResultObject<User> register(String username,
			String password, String email) {
		OperationResultObject<User> resultRead = accountRepository
				.readFromUsername(username);

		if (resultRead.isSuccess()) {
			return new OperationResultObject<User>(false,
					"Username already exist.");
		} else {
			String session = getUniqueSession();
			User user = new User();
			user.setSession(session);
			user.setUsername(username);
			user.setPassword(password);
			user.setEmail(email);

			OperationResult result = accountRepository.create(user);

			return new OperationResultObject<User>(result.isSuccess(), user);
		}
	}

	public OperationResultObject<User> edit(String session_id, String username,
			String password, String email) {
		OperationResultObject<User> resultReadSess = accountRepository
				.readFromSession(session_id);

		if (resultReadSess.isSuccess()) {
			OperationResultObject<User> resultRead = accountRepository
					.readFromUsername(username);

			if (resultRead.isSuccess()) {
				return new OperationResultObject<User>(false,
						"Username already exist.");
			}
			
			resultReadSess.getObject().setUsername(username);
			resultReadSess.getObject().setPassword(password);
			resultReadSess.getObject().setEmail(email);

			return new OperationResultObject<User>(true, resultReadSess.getObject());
		} else {
			return new OperationResultObject<User>(false,
					"User session invalid.");
		}
	}

	public OperationResultObject<User> login(String username, String password) {
		OperationResultObject<User> resultRead = accountRepository
				.readFromUsername(username);

		if (resultRead.isSuccess()
				&& resultRead.getObject().getPassword().equals(password)) {
			String session = getUniqueSession();
			resultRead.getObject().setSession(session);
			OperationResult resultSave = accountRepository.update(resultRead
					.getObject());

			if (!resultSave.isSuccess()) {
				return new OperationResultObject<User>(false,
						"Unable to save the new session.");
			}

			return new OperationResultObject<User>(true, resultRead.getObject());
		} else {
			return new OperationResultObject<User>(false,
					"Username or password invalid.");
		}
	}

	public OperationResult logout(String session_id) {
		OperationResultObject<User> resultRead = accountRepository
				.readFromSession(session_id);

		if (resultRead.isSuccess()) {
			resultRead.getObject().setSession(null);

			OperationResult resultSave = accountRepository.update(resultRead
					.getObject());

			if (!resultSave.isSuccess()) {
				return new OperationResultObject<User>(false,
						"Unable to save logged out user.");
			}

			return new OperationResult(true);

		} else {
			return new OperationResultObject<User>(false,
					"User session invalid.");
		}
	}

	private String getUniqueSession() {
		Random rand = new Random(System.currentTimeMillis());
		OperationResultObject<User> tmp_user;
		String session;

		do {
			session = String.valueOf(rand.nextLong());
			tmp_user = accountRepository.readFromSession(session);
		} while (tmp_user.isSuccess());

		return session;
	}
}
