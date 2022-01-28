package com.spring.Jumpstart.service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.Jumpstart.entity.ItemWare;
import com.spring.Jumpstart.entity.key.ItemWareKey;
import com.spring.Jumpstart.repo.ItemWareRepository;

@Service
public class ItemWareServiceImpl implements ItemWareService {
	
	@Autowired
	ItemWareRepository iwRepo;

	@Override
	public Collection<ItemWare> getWarehouseInventory(int id) {
		System.out.println(iwRepo.findByWarehouseId(id));
		return iwRepo.findByWarehouseId(id);
	}

	@Override
	public void addStocks(ItemWare iw) {
		ItemWare iwr = iwRepo.getById(iw.getId());
		iwr.setStocks(iwr.getStocks()+iw.getStocks());
		iwRepo.save(iwr);
	}

	@Override
	public void addItem(ItemWare iw) {
		iwRepo.save(iw);
	}

	@Override
	public ItemWare getById(ItemWareKey id) {
		return iwRepo.findById(id).get();
		
	}

	@Override
	public void delateItem(ItemWare ir) {
		iwRepo.delete(ir);
		
	}

}
