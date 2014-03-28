package org.appstore.controller;

import org.appstore.common.OperationResultObject;
import org.appstore.domain.Cart;
import org.appstore.domain.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CartController {
	@Autowired
	CartRepository cartRepository;

	public OperationResultObject<Cart> getCartFromUserSession(String session_id) {
		return cartRepository.getCartFromUserSession(session_id);
	}
}
