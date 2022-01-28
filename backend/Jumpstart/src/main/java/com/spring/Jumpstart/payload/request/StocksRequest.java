package com.spring.Jumpstart.payload.request;

import com.spring.Jumpstart.entity.key.ItemWareKey;

public class StocksRequest {
	private ItemWareKey id;
	private boolean isOpen;
	private String stocks;
	
	public ItemWareKey getId() {
		return id;
	}
	public void setId(ItemWareKey id) {
		this.id = id;
	}
	public boolean isOpen() {
		return isOpen;
	}
	public void setOpen(boolean isOpen) {
		this.isOpen = isOpen;
	}
	public String getStocks() {
		return stocks;
	}
	public void setStocks(String stocks) {
		this.stocks = stocks;
	}
	
	
	
	
}
