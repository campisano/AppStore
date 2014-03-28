package org.appstore.common;

public class OperationResultObject<T> extends OperationResult {
	private T object;

	public OperationResultObject(boolean success, T object) {
		super(success, null);
		this.object = object;
	}

	public OperationResultObject(boolean failure, String message) {
		super(failure, message);
		this.object = null;
	}

	public T getObject() {
		return this.object;
	}
}
