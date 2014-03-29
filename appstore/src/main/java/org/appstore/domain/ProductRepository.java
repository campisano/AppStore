package org.appstore.domain;

import java.util.List;

import org.appstore.common.OperationResult;
import org.appstore.common.OperationResultObject;
import org.appstore.persistence.DAOException;
import org.appstore.persistence.ProductDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProductRepository {
	@Autowired
	ProductDAO productDAO;

	public OperationResult create(Product entity) {
		try {
			productDAO.create(entity);

			return new OperationResult(true);
		} catch (DAOException ex) {
			return new OperationResult(false, ex.getMessage());
		}
	}

	public OperationResultObject<List<Product>> read() {
		try {
			return new OperationResultObject<List<Product>>(true,
					productDAO.read());
		} catch (DAOException ex) {
			return new OperationResultObject<List<Product>>(false,
					ex.getMessage());
		}
	}

	public OperationResultObject<Product> read(String product_id) {
		try {
			return new OperationResultObject<Product>(true,
					productDAO.read(product_id));
		} catch (DAOException ex) {
			return new OperationResultObject<Product>(false, ex.getMessage());
		}
	}

	public OperationResult update(Product entity) {
		try {
			productDAO.update(entity);

			return new OperationResult(true);
		} catch (DAOException ex) {
			return new OperationResult(false, ex.getMessage());
		}
	}

	public OperationResult delete(String product_id) {
		try {
			productDAO.delete(product_id);

			return new OperationResult(true);
		} catch (DAOException ex) {
			return new OperationResult(false, ex.getMessage());
		}
	}
}
