package org.appstore.persistence;

import java.util.List;

import org.appstore.domain.User;

public interface UserDAO {

	public void create(User entity);

	public List<User> read();

	public User read(String id);

	public User readFromUsername(String username);

	public User readFromSession(String session);

	public void update(User entity);

	public void delete(String id);
}
