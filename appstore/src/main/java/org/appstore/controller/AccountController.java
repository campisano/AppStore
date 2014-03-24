package org.appstore.controller;

import java.util.Random;

import org.appstore.common.OperationResultObject;
import org.appstore.domain.AccountRepository;
import org.appstore.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AccountController {
	@Autowired
	AccountRepository accountRepository;

	public OperationResultObject<User> login(String username, String password) {
		OperationResultObject<User> result = accountRepository
				.readFromUsername(username);

		if (result.isSuccess()) {
			Random rand = new Random(System.currentTimeMillis());
			OperationResultObject<User> tmp_user;
			String session;

			do {
				session = String.valueOf(rand.nextLong());
				tmp_user = accountRepository.readFromSession(session);
			} while (tmp_user.isSuccess());

			result.getObject().setSession(session);
		}

		return result;
	}
}
