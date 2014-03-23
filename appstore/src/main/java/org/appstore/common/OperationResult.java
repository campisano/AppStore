package org.appstore.common;

public class OperationResult {

	private boolean result;
	private String message;

	public OperationResult(boolean success) {
		this(success, null);
	}

	public OperationResult(boolean failure, String message) {
		this.result = failure;
		this.message = message;
	}

	public boolean isSuccess() {
		return this.result;
	}

	public String getMessage() {
		return this.message;
	}
}
