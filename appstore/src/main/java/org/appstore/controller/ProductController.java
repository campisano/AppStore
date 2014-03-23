package org.appstore.controller;

import java.util.List;

import org.appstore.common.OperationResultObject;
import org.appstore.domain.Product;
import org.appstore.domain.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProductController {
	@Autowired
	ProductRepository productRepository;

	public OperationResultObject<List<Product>> getProductList() {
		return productRepository.read();
	}

	public OperationResultObject<Product> getProduct(String id) {
		return productRepository.read(id);
	}
}
