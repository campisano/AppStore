package org.appstore.view;

import org.appstore.domain.Product;

public class GetProductResponse {
	private long id;
	private String name;
	private double price;
	private String version;
	private int size;
	private String system;
	private int type;
	private int category;
	private int age;
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

	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getPrice() {
		return this.price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}

	public String getSystem() {
		return system;
	}

	public void setSystem(String system) {
		this.system = system;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public int getCategory() {
		return category;
	}

	public void setCategory(int category) {
		this.category = category;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
