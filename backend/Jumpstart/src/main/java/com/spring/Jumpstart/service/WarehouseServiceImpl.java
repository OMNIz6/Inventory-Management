package com.spring.Jumpstart.service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.Jumpstart.entity.Warehouse;
import com.spring.Jumpstart.repo.WarehouseRepository;

@Service
public class WarehouseServiceImpl implements WarehouseService{
	
	@Autowired
	WarehouseRepository wareRepo;

	@Override
	public Collection<Warehouse> getAllWarehouses() {
		return wareRepo.findAll();
	}

	@Override
	public Warehouse addWarehouse(Warehouse ware) {
		return wareRepo.save(ware);
	}

	@Override
	public void deleteWarehouse(Warehouse ware) {
		wareRepo.delete(ware);
	}

	@Override
	public Warehouse getWarehouse(int id) {
		
		return wareRepo.findById(id).get();
	}

}
