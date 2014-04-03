package org.appstore.infrastructure;

import java.util.List;

import org.appstore.domain.User;
import org.appstore.persistence.DAOException;
import org.appstore.persistence.UserDAO;
import org.springframework.stereotype.Component;

@Component
public class UserDAOJPA extends GenericDAOJPA<User> implements UserDAO {

	public List<User> read() {
		return read(User.class);
	}

	public User read(String id) {
		return read(User.class, id);
	}

	public User readFromUsername(String username) {
		try {
			return readSingle(User.class,
					"SELECT e FROM User e WHERE e.username = ?1", username);
		} catch (Exception ex) {
			throw new DAOException("ERROR GenericDAOJPA.read():\n"
					+ ex.getMessage(), ex);
		}
	}

	public User readFromSession(String session) {
		try {
			return readSingle(User.class,
					"SELECT e FROM User e WHERE e.session = ?1", session);
		} catch (Exception ex) {
			throw new DAOException("ERROR GenericDAOJPA.read():\n"
					+ ex.getMessage(), ex);
		}
	}

	public void delete(String id) {
		delete(User.class, id);
	}
}
