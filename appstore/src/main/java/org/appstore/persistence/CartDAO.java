package org.appstore.persistence;

import org.appstore.domain.Cart;

public interface CartDAO {
	public Cart getCartFromUserSession(String session_id);

	public void update(Cart entity);
}
