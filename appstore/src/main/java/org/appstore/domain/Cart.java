package org.appstore.domain;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;

@Entity
public class Cart {
	@Id
	@GeneratedValue
	private Long id;
	@OneToOne(optional = false)
	private User user;
	@ManyToMany
	@JoinTable(name = "Cart_Product", joinColumns = {@JoinColumn(name = "cart_id", referencedColumnName = "id")}, inverseJoinColumns = {@JoinColumn(name = "product_id", referencedColumnName = "id", unique = true)})
	private Set<Product> products;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Set<Product> getProducts() {
		return products;
	}

	public void setProducts(Set<Product> products) {
		this.products = products;
	}
}
