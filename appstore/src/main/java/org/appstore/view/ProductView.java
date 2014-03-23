package org.appstore.view;

import java.util.List;

import org.appstore.common.OperationResultObject;
import org.appstore.controller.ProductController;
import org.appstore.domain.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Component
@RequestMapping("/product")
public class ProductView {
	@Autowired
	ProductController productController;

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public @ResponseBody
	OperationResponse<GetProductListResponse> getProductList() {

		OperationResponse<GetProductListResponse> response = new OperationResponse<GetProductListResponse>();

		try {
			OperationResultObject<List<Product>> result = productController
					.getProductList();

			if (result.isSuccess()) {
				response.setResponse(new GetProductListResponse());
				for (Product item : result.getObject()) {
					response.getResponse().add(new GetProductResponse(item));
				}
			} else {
				response.setError(result.getMessage());
			}
		} catch (Exception ex) {
			response.setError(ex.getMessage());
		}

		return response;
	}

	@RequestMapping(value = "/{id:.+}", method = RequestMethod.GET)
	public @ResponseBody
	OperationResponse<GetProductResponse> getProduct(@PathVariable String id) {
		OperationResponse<GetProductResponse> response = new OperationResponse<GetProductResponse>();

		try {
			OperationResultObject<Product> result = productController
					.getProduct(id.replace('|', '/'));

			if (result.isSuccess()) {
				response.setResponse(new GetProductResponse(result.getObject()));
			} else {
				response.setError(result.getMessage());
			}

		} catch (Exception ex) {
			response.setError(ex.getMessage());
		}

		return response;
	}
}
