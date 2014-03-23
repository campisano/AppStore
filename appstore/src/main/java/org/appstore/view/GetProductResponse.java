package org.appstore.view;

import org.appstore.domain.Product;

public class GetProductResponse {
	private String id;
	private String name;
	private String price;
	private String version;
	private String size;
	private String system;
	private String type;
	private String category;
	private String age;
	private String description;

	public GetProductResponse() {

	}

	public GetProductResponse(Product product) {
		this.setId(product.getId());
		this.setName(product.getName());
		this.setPrice(product.getPrice());
		this.setVersion(product.getVersion());
		this.setSize(product.getSize());
		this.setSystem(product.getSystem());
		this.setType(product.getType());
		this.setCategory(product.getCategory());
		this.setAge(product.getAge());
		this.setDescription(product.getDescription());
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPrice() {
		return this.price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getSystem() {
		return system;
	}

	public void setSystem(String system) {
		this.system = system;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		this.age = age;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
