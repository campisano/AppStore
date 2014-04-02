package org.appstore.controller;

import java.util.HashSet;

import org.appstore.common.OperationResult;
import org.appstore.common.OperationResultObject;
import org.appstore.domain.AccountRepository;
import org.appstore.domain.Cart;
import org.appstore.domain.CartRepository;
import org.appstore.domain.Product;
import org.appstore.domain.ProductRepository;
import org.appstore.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CartController {
	@Autowired
	CartRepository cartRepository;
	@Autowired
	ProductRepository productRepository;
	@Autowired
	AccountRepository accountRepository;

	public OperationResultObject<Cart> getCartFromUserSession(String session_id) {
		return cartRepository.getCartFromUserSession(session_id);
	}

	public OperationResult addProduct(String session_id, String product_id) {
		OperationResultObject<Cart> resultGetCart = cartRepository
				.getCartFromUserSession(session_id);

		if (!resultGetCart.isSuccess()) {
			return new OperationResult(false,
					"Unable to retrieve Cart from session_id");
		}

		OperationResultObject<Product> resultGetProduct = productRepository
				.read(product_id);

		if (!resultGetProduct.isSuccess()) {
			return new OperationResult(false,
					"Unable to retrieve Product from product_id");
		}

		Cart cart = resultGetCart.getObject();

		if (cart == null) {
			OperationResultObject<User> resultGetUser = accountRepository
					.readFromSession(session_id);

			if (!resultGetUser.isSuccess()) {
				return new OperationResult(false, "Unable to retrieve User");
			}

			cart = new Cart();
			cart.setUser(resultGetUser.getObject());
		}

		if (cart.getProducts() == null) {
			cart.setProducts(new HashSet<Product>());
		}

		cart.getProducts().add(resultGetProduct.getObject());
		OperationResult resultAdd = cartRepository.save(cart);

		if (!resultAdd.isSuccess()) {
			return new OperationResult(false, "Unable to update Cart");
		}

		return new OperationResult(true);
	}

	public OperationResult removeProduct(String session_id, String product_id) {
		OperationResultObject<Cart> resultGetCart = cartRepository
				.getCartFromUserSession(session_id);

		if (!resultGetCart.isSuccess()) {
			return new OperationResult(false,
					"Unable to retrieve Cart from session_id");
		}

		OperationResultObject<Product> resultGetProduct = productRepository
				.read(product_id);

		if (!resultGetProduct.isSuccess()) {
			return new OperationResult(false,
					"Unable to retrieve Product from product_id");
		}

		Cart cart = resultGetCart.getObject();
		cart.getProducts().remove(resultGetProduct.getObject());
		OperationResult resultAdd = cartRepository.save(cart);

		if (!resultAdd.isSuccess()) {
			return new OperationResult(false, "Unable to update Cart");
		}

		return new OperationResult(true);
	}

	public OperationResult removeAllProducts(String session_id) {
		OperationResultObject<Cart> resultGetCart = cartRepository
				.getCartFromUserSession(session_id);

		if (!resultGetCart.isSuccess()) {
			return new OperationResult(false,
					"Unable to retrieve Cart from session_id");
		}

		Cart cart = resultGetCart.getObject();
		cart.getProducts().clear();
		OperationResult resultAdd = cartRepository.save(cart);

		if (!resultAdd.isSuccess()) {
			return new OperationResult(false, "Unable to update Cart");
		}

		return new OperationResult(true);
	}

	public OperationResult checkout(String session_id, String payment_id) {
		OperationResultObject<Cart> resultGetCart = cartRepository
				.getCartFromUserSession(session_id);

		if (!resultGetCart.isSuccess()) {
			return new OperationResult(false,
					"Unable to retrieve Cart from session_id");
		}

		// TODO [CMP] payment to implement, email to sent.

		Cart cart = resultGetCart.getObject();
		cart.getProducts().clear();
		OperationResult resultAdd = cartRepository.save(cart);

		if (!resultAdd.isSuccess()) {
			return new OperationResult(false, "Unable to update Cart");
		}

		return new OperationResult(true);
	}
}
