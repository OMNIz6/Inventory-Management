package com.spring.Jumpstart.service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.Jumpstart.entity.Item;
import com.spring.Jumpstart.repo.ItemRepository;

@Service
public class ItemServiceImpl implements ItemService {
	
	@Autowired
	ItemRepository itemRepo;

	@Override
	public Collection<Item> getAllItems() {
		return itemRepo.findAll();
	}

	@Override
	public Item addItem(Item item) {
		return itemRepo.save(item);
	}

	@Override
	public void deleteItem(Item item) {
		itemRepo.delete(item);
	}

	@Override
	public Collection<Item> getWarehouseInventory(int id) {
		return itemRepo.findByWarehouseId(id);
	}

	@Override
	public Collection<Item> getRetailInventory(int id) {
		return itemRepo.findByRetailId(id);
	}

	@Override
	public Collection<Item> getNotWarehouseInventory(int id) {
	
		return itemRepo.findByNotWarehouseId(id);
	}

	@Override
	public Collection<Item> getNotRetailInventory(int id) {
			
		return itemRepo.findByNotRetailId(id);
	}

	@Override
	public Item getItem(int id) {
		return itemRepo.getById(id);
	}

	@Override
	public Collection<Item> getSuppliableItems(int id, Collection<Item> items) {
		return itemRepo.findByRetailIdAndItems(id, items);
	}
	
}
