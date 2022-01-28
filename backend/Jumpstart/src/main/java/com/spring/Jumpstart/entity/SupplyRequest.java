package com.spring.Jumpstart.entity;

import java.util.Collection;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

@Entity
public class SupplyRequest {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int requestId;
	
	private String message;
	private Date date;
	private int stocks;
	
	@ManyToOne
	@JoinColumn(name="retail_id")
	private Retail retail;
	
	@ManyToMany
	@JoinTable(
		name = "",
		joinColumns = @JoinColumn(name="item_id"),
		inverseJoinColumns = @JoinColumn(name="requestId")
		)
	Collection<Item> items;

	public int getRequestId() {
		return requestId;
	}

	public void setRequestId(int requestId) {
		this.requestId = requestId;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Retail getRetail() {
		return retail;
	}

	public void setRetail(Retail retail) {
		this.retail = retail;
	}

	public Collection<Item> getItems() {
		return items;
	}

	public void setItems(Collection<Item> items) {
		this.items = items;
	}

	public int getStocks() {
		return stocks;
	}

	public void setStocks(int stocks) {
		this.stocks = stocks;
	}
	
	
}
