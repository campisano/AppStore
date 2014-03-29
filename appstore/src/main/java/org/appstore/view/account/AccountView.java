package org.appstore.view.account;

import org.appstore.common.OperationResult;
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

	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public @ResponseBody
	OperationResponse<AccountResponse> register(
			@RequestBody RegisterRequest request) {

		OperationResponse<AccountResponse> response = new OperationResponse<AccountResponse>();

		try {
			OperationResultObject<User> result = accountController.register(
					request.getUsername(), request.getPassword(),
					request.getEmail());

			if (result.isSuccess()) {
				response.setResponse(new AccountResponse());
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

	@RequestMapping(value = "/edit", method = RequestMethod.POST)
	public @ResponseBody
	OperationResponse<AccountResponse> edit(@RequestBody EditRequest request) {

		OperationResponse<AccountResponse> response = new OperationResponse<AccountResponse>();

		try {
			OperationResultObject<User> result = accountController.edit(
					request.getSession_id(), request.getUsername(),
					request.getPassword(), request.getEmail());

			if (result.isSuccess()) {
				response.setResponse(new AccountResponse());
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

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public @ResponseBody
	OperationResponse<AccountResponse> login(@RequestBody LoginRequest request) {

		OperationResponse<AccountResponse> response = new OperationResponse<AccountResponse>();

		try {
			OperationResultObject<User> result = accountController.login(
					request.getUsername(), request.getPassword());

			if (result.isSuccess()) {
				response.setResponse(new AccountResponse());
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

	@RequestMapping(value = "/logout", method = RequestMethod.POST)
	public @ResponseBody
	OperationResponse<AccountResponse> logout(@RequestBody LogoutRequest request) {

		OperationResponse<AccountResponse> response = new OperationResponse<AccountResponse>();

		try {
			OperationResult result = accountController.logout(request
					.getSession_id());

			if (!result.isSuccess()) {
				response.setError(result.getMessage());
			}
		} catch (Exception ex) {
			response.setError(ex.getMessage());
		}

		return response;
	}

	@RequestMapping(value = "/session", method = RequestMethod.POST)
	public @ResponseBody
	OperationResponse<AccountResponse> getSession(
			@RequestBody SessionRequest request) {

		OperationResponse<AccountResponse> response = new OperationResponse<AccountResponse>();

		try {
			OperationResultObject<User> result = accountController
					.getSession(request.getSession_id());

			if (result.isSuccess()) {
				response.setResponse(new AccountResponse());
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
