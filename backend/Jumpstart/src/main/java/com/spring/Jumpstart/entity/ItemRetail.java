package com.spring.Jumpstart.entity;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.spring.Jumpstart.entity.key.ItemRetailKey;

@Entity
public class ItemRetail {
	@EmbeddedId
	private ItemRetailKey id;
	
	private int Stocks;
	private int maxStocks;
	private int minStocks;
	
	@ManyToOne
	@MapsId("itemId")
	@JoinColumn(name="item_id")
	@JsonBackReference(value="item to retail")
	private Item item;
	
	@ManyToOne
	@MapsId("retailId")
	@JoinColumn(name="retail_id")
	@JsonBackReference(value="retail to item")
	private Retail retail;

	public ItemRetailKey getId() {
		return id;
	}
	
	public void setId(ItemRetailKey id) {
		this.id = id;
	}

	public int getStocks() {
		return Stocks;
	}

	public void setStocks(int stocks) {
		Stocks = stocks;
	}

	public int getMaxStocks() {
		return maxStocks;
	}

	public void setMaxStocks(int maxStocks) {
		this.maxStocks = maxStocks;
	}

	public int getMinStocks() {
		return minStocks;
	}

	public void setMinStocks(int minStocks) {
		this.minStocks = minStocks;
	}

	public Item getItem() {
		return item;
	}

	public void setItem(Item item) {
		this.item = item;
	}

	public Retail getRetail() {
		return retail;
	}

	public void setRetail(Retail retail) {
		this.retail = retail;
	}
	
	
	
}
