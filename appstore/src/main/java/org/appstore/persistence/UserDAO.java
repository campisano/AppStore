package org.appstore.persistence;

import java.util.List;

import org.appstore.domain.User;

public interface UserDAO {

	public void create(User entity) throws DAOException;

	public List<User> read() throws DAOException;

	public User read(String id) throws DAOException;

	public User readFromUsername(String username) throws DAOException;

	public User readFromSession(String session) throws DAOException;

	public void update(User entity) throws DAOException;

	public void delete(String id) throws DAOException;
}
