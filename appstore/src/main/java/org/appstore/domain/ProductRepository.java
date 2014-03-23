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
			return new OperationResultObject<>(true, productDAO.read());
		} catch (DAOException ex) {
			return new OperationResultObject<>(false, ex.getMessage());
		}
	}

	public OperationResultObject<Product> read(String id) {
		try {
			return new OperationResultObject<>(true, productDAO.read(id));
		} catch (DAOException ex) {
			return new OperationResultObject<>(false, ex.getMessage());
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

	public OperationResult delete(String id) {
		try {
			productDAO.delete(id);

			return new OperationResult(true);
		} catch (DAOException ex) {
			return new OperationResult(false, ex.getMessage());
		}
	}
}
