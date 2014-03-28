package org.appstore.domain;

import org.appstore.common.OperationResultObject;
import org.appstore.persistence.CartDAO;
import org.appstore.persistence.DAOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CartRepository {
	@Autowired
	CartDAO cartDAO;

	public OperationResultObject<Cart> getCartFromUserSession(String session) {
		try {
			return new OperationResultObject<Cart>(true,
					cartDAO.getCartFromUserSession(session));
		} catch (DAOException ex) {
			return new OperationResultObject<Cart>(false, ex.getMessage());
		}
	}
}
