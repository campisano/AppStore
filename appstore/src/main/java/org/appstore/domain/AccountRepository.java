package org.appstore.domain;

import java.util.List;

import org.appstore.common.OperationResult;
import org.appstore.common.OperationResultObject;
import org.appstore.persistence.DAOException;
import org.appstore.persistence.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AccountRepository {
	@Autowired
	UserDAO userDAO;

	public OperationResult create(User entity) {
		try {
			userDAO.create(entity);

			return new OperationResult(true);
		} catch (DAOException ex) {
			return new OperationResult(false, ex.getMessage());
		}
	}

	public OperationResultObject<List<User>> read() {
		try {
			return new OperationResultObject<List<User>>(true, userDAO.read());
		} catch (DAOException ex) {
			return new OperationResultObject<List<User>>(false, ex.getMessage());
		}
	}

	public OperationResultObject<User> read(String id) {
		try {
			return new OperationResultObject<User>(true, userDAO.read(id));
		} catch (DAOException ex) {
			return new OperationResultObject<User>(false, ex.getMessage());
		}
	}

	public OperationResultObject<User> readFromUsername(String username) {
		try {
			return new OperationResultObject<User>(true,
					userDAO.readFromUsername(username));
		} catch (DAOException ex) {
			return new OperationResultObject<User>(false, ex.getMessage());
		}
	}

	public OperationResultObject<User> readFromSession(String session) {
		try {
			return new OperationResultObject<User>(true,
					userDAO.readFromSession(session));
		} catch (DAOException ex) {
			return new OperationResultObject<User>(false, ex.getMessage());
		}
	}

	public OperationResult update(User entity) {
		try {
			userDAO.update(entity);

			return new OperationResult(true);
		} catch (DAOException ex) {
			return new OperationResult(false, ex.getMessage());
		}
	}

	public OperationResult delete(String id) {
		try {
			userDAO.delete(id);

			return new OperationResult(true);
		} catch (DAOException ex) {
			return new OperationResult(false, ex.getMessage());
		}
	}
}
