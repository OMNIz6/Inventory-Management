package com.spring.Jumpstart.service;

import java.util.Collection;

import com.spring.Jumpstart.entity.ItemRetail;
import com.spring.Jumpstart.entity.key.ItemRetailKey;

public interface ItemRetailService {
	public Collection<ItemRetail> getRetailInvenory(int id);
	public void addStocks(ItemRetail ir);
	public void delateItem(ItemRetail ir);
	public ItemRetail getById(ItemRetailKey id);
}
