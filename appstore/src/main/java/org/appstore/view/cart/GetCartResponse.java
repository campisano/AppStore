package org.appstore.view.cart;

import java.util.HashSet;
import java.util.Set;

import org.appstore.domain.Cart;
import org.appstore.domain.Product;
import org.appstore.view.product.GetProductResponse;

public class GetCartResponse {
	private String id;
	private Set<GetProductResponse> products;

	public GetCartResponse() {

	}

	public GetCartResponse(Cart cart) {
		this.id = String.valueOf(cart.getId());
		this.products = new HashSet<GetProductResponse>();

		for (Product product : cart.getProducts()) {
			this.products.add(new GetProductResponse(product));
		}
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Set<GetProductResponse> getProducts() {
		return products;
	}

	public void setProducts(Set<GetProductResponse> products) {
		this.products = products;
	}
}
