package org.appstore.persistence;

import java.util.List;

import org.appstore.domain.Product;

public interface ProductDAO {

	public void create(Product entity) throws DAOException;

	public List<Product> read() throws DAOException;

	public Product read(String id) throws DAOException;

	public void update(Product entity) throws DAOException;

	public void delete(String id) throws DAOException;
}
