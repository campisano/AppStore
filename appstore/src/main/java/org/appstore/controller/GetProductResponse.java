package org.appstore.controller;

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
}
