package com.spring.Jumpstart.service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.Jumpstart.entity.ItemRetail;
import com.spring.Jumpstart.entity.key.ItemRetailKey;
import com.spring.Jumpstart.repo.ItemRetailRepository;

@Service
public class ItemRetailServiceImpl implements ItemRetailService{
	
	@Autowired
	ItemRetailRepository irRepo;

	@Override
	public Collection<ItemRetail> getRetailInvenory(int id) {
		return irRepo.findByRetailId(id);
	}

	@Override
	public ItemRetail getById(ItemRetailKey id) {
		return irRepo.getById(id);
	}

	@Override
	public void addStocks(ItemRetail iw) {
		irRepo.save(iw);
		
	}

	@Override
	public void delateItem(ItemRetail ir) {
		irRepo.delete(ir);
	}
	
	

}
