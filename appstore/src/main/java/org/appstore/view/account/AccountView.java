package org.appstore.view.account;

import org.appstore.common.OperationResultObject;
import org.appstore.controller.AccountController;
import org.appstore.domain.User;
import org.appstore.view.product.OperationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Component
@RequestMapping("/account")
public class AccountView {
	@Autowired
	AccountController accountController;

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public @ResponseBody
	OperationResponse<LoginResponse> login(@RequestBody LoginRequest request) {

		OperationResponse<LoginResponse> response = new OperationResponse<LoginResponse>();

		response.setResponse(new LoginResponse());

		try {
			OperationResultObject<User> result = accountController.login(
					request.getUsername(), request.getPassword());

			if (result.isSuccess()) {
				response.setResponse(new LoginResponse());
				response.getResponse().setSession_id(
						result.getObject().getSession());
				response.getResponse().setUsername(
						result.getObject().getUsername());
				response.getResponse().setEmail(result.getObject().getEmail());
			} else {
				response.setError(result.getMessage());
			}
		} catch (Exception ex) {
			response.setError(ex.getMessage());
		}

		return response;
	}
}
