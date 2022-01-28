package com.spring.Jumpstart.service;

import java.util.Collection;

import com.spring.Jumpstart.entity.ItemWare;
import com.spring.Jumpstart.entity.key.ItemWareKey;

public interface ItemWareService {
	public Collection<ItemWare> getWarehouseInventory(int id);
	public void addStocks(ItemWare iw);
	public void addItem(ItemWare iw);
	public ItemWare getById(ItemWareKey id);
	public void delateItem(ItemWare ir);
}
