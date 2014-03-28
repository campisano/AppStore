package org.appstore.infrastructure;

import java.util.List;

import org.appstore.domain.Product;
import org.appstore.persistence.ProductDAO;
import org.springframework.stereotype.Component;

@Component
public class ProductDAOJPA extends GenericDAOJPA<Product> implements ProductDAO {

	public List<Product> read() {
		return read(Product.class);
	}

	public Product read(String id) {
		return read(Product.class, id);
	}

	public void delete(String id) {
		delete(Product.class, id);
	}
}
