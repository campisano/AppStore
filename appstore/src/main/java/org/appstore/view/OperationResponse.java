package org.appstore.view;

public class OperationResponse<T> {
	private String error;
	private T response;

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
		this.response = null;
	}

	public T getResponse() {
		return response;
	}

	public void setResponse(T response) {
		this.response = response;
		this.error = null;
	}
}
