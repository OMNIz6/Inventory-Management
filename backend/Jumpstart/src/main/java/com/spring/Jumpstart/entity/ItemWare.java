package com.spring.Jumpstart.entity;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.spring.Jumpstart.entity.key.ItemWareKey;

@Entity
public class ItemWare {
	@EmbeddedId
	private ItemWareKey id;
	
	private int Stocks;
	private int maxStocks;
	private int minStocks;
	
	@ManyToOne
	@MapsId("itemid")
	@JoinColumn(name="item_id")
	@JsonBackReference(value="item to warehouse")
	private Item item;
	
	@ManyToOne
	@MapsId("warehouseid")
	@JoinColumn(name="warehouse_id")
	@JsonBackReference(value="warehouse to item")
	private Warehouse warehouse;

	public ItemWareKey getId() {
		return id;
	}

	public void setId(ItemWareKey id) {
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

	public Warehouse getWarehouse() {
		return warehouse;
	}

	public void setWarehouse(Warehouse warehouse) {
		this.warehouse = warehouse;
	}

	@Override
	public String toString() {
		return "ItemWare [id=" + id.getItemid()+".."+ id.getWarehouseid() + ", Stocks=" + Stocks + ", maxStocks=" + maxStocks + ", minStocks=" + minStocks
				+ ", item=" + item + ", warehouse=" + warehouse + "]";
	}
	
	
}
