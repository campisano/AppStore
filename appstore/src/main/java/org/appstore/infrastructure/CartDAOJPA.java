package org.appstore.infrastructure;

import org.appstore.domain.Cart;
import org.appstore.persistence.CartDAO;
import org.appstore.persistence.DAOException;
import org.springframework.stereotype.Component;

@Component
public class CartDAOJPA extends GenericDAOJPA<Cart> implements CartDAO {

	public Cart getCartFromUserSession(String session) {
		try {
			return readSingleOrNull(
					Cart.class,
					"SELECT c FROM Cart as c INNER JOIN c.user as u WHERE u.session = ?",
					session);
		} catch (Exception ex) {
			throw new DAOException("ERROR GenericDAOJPA.read():\n"
					+ ex.getMessage(), ex);
		}
	}
}
