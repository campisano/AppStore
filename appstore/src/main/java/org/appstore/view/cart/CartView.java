package org.appstore.view.cart;

import org.appstore.common.OperationResult;
import org.appstore.common.OperationResultObject;
import org.appstore.controller.CartController;
import org.appstore.domain.Cart;
import org.appstore.view.product.OperationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Component
@RequestMapping("/cart")
public class CartView {
	@Autowired
	CartController cartController;

	@RequestMapping(value = "/{session_id:.+}", method = RequestMethod.GET)
	public @ResponseBody
	OperationResponse<GetCartResponse> getCart(@PathVariable String session_id) {
		OperationResponse<GetCartResponse> response = new OperationResponse<GetCartResponse>();

		try {
			OperationResultObject<Cart> result = cartController
					.getCartFromUserSession(session_id);

			if (result.isSuccess()) {
				response.setResponse(new GetCartResponse(result.getObject()));
			} else {
				response.setError(result.getMessage());
			}

		} catch (Exception ex) {
			response.setError(ex.getMessage());
		}

		return response;
	}

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public @ResponseBody
	OperationResponse<GetCartResponse> getCartList() {

		OperationResponse<GetCartResponse> response = new OperationResponse<GetCartResponse>();
		response.setError("seila");

		return response;
	}

	@RequestMapping(value = "/addproduct", method = RequestMethod.POST)
	public @ResponseBody
	OperationResponse<GetCartResponse> addProduct(
			@RequestBody AddProductRequest request) {

		OperationResponse<GetCartResponse> response = new OperationResponse<GetCartResponse>();

		try {
			OperationResult resultAdd = cartController.addProduct(
					request.getSession_id(), request.getProduct_id());

			if (resultAdd.isSuccess()) {
				OperationResultObject<Cart> resultGet = cartController
						.getCartFromUserSession(request.getSession_id());

				if (resultGet.isSuccess()) {
					response.setResponse(new GetCartResponse(resultGet
							.getObject()));
				} else {
					response.setError(resultGet.getMessage());
				}
			} else {
				response.setError(resultAdd.getMessage());
			}
		} catch (Exception ex) {
			response.setError(ex.getMessage());
		}

		return response;
	}

	@RequestMapping(value = "/removeproduct", method = RequestMethod.POST)
	public @ResponseBody
	OperationResponse<GetCartResponse> removeProduct(
			@RequestBody RemoveProductRequest request) {

		OperationResponse<GetCartResponse> response = new OperationResponse<GetCartResponse>();

		try {
			OperationResult resultRem = cartController.removeProduct(
					request.getSession_id(), request.getProduct_id());

			if (resultRem.isSuccess()) {
				OperationResultObject<Cart> resultGet = cartController
						.getCartFromUserSession(request.getSession_id());

				if (resultGet.isSuccess()) {
					response.setResponse(new GetCartResponse(resultGet
							.getObject()));
				} else {
					response.setError(resultGet.getMessage());
				}
			} else {
				response.setError(resultRem.getMessage());
			}
		} catch (Exception ex) {
			response.setError(ex.getMessage());
		}

		return response;
	}

	@RequestMapping(value = "/removeallproducts", method = RequestMethod.POST)
	public @ResponseBody
	OperationResponse<GetCartResponse> removeAllProducts(
			@RequestBody RemoveAllProductsRequest request) {

		OperationResponse<GetCartResponse> response = new OperationResponse<GetCartResponse>();

		try {
			OperationResult resultRem = cartController
					.removeAllProducts(request.getSession_id());

			if (resultRem.isSuccess()) {
				OperationResultObject<Cart> resultGet = cartController
						.getCartFromUserSession(request.getSession_id());

				if (resultGet.isSuccess()) {
					response.setResponse(new GetCartResponse(resultGet
							.getObject()));
				} else {
					response.setError(resultGet.getMessage());
				}
			} else {
				response.setError(resultRem.getMessage());
			}
		} catch (Exception ex) {
			response.setError(ex.getMessage());
		}

		return response;
	}
}
