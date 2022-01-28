package com.spring.Jumpstart.service;

import java.util.Collection;

import org.springframework.stereotype.Service;

import com.spring.Jumpstart.entity.Item;


@Service
public interface ItemService {
	public Collection<Item> getAllItems();
	
	public Item getItem(int id);
	
	public Item addItem(Item item);
	
	public void deleteItem(Item item);
	
	public Collection<Item> getWarehouseInventory(int id);
	
	public Collection<Item> getRetailInventory(int id);
	
	public Collection<Item> getNotWarehouseInventory(int id);
	
	public Collection<Item> getNotRetailInventory(int id);
	
	public Collection<Item> getSuppliableItems(int id, Collection<Item> items);
}
