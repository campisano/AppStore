package org.appstore.persistence;

import java.util.List;

import org.appstore.domain.Product;

public interface ProductDAO {

	public void create(Product entity);

	public List<Product> read();

	public Product read(String id);

	public void update(Product entity);

	public void delete(String id);
}
