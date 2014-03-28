package org.appstore.view.cart;

import org.appstore.common.OperationResultObject;
import org.appstore.controller.CartController;
import org.appstore.domain.Cart;
import org.appstore.view.product.OperationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
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
}
