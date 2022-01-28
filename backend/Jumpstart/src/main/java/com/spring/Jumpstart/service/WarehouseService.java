package com.spring.Jumpstart.service;

import java.util.Collection;

import com.spring.Jumpstart.entity.Warehouse;

public interface WarehouseService {
	public Collection<Warehouse> getAllWarehouses();
	public Warehouse getWarehouse(int id);
	public Warehouse addWarehouse(Warehouse ware);
	public void deleteWarehouse(Warehouse ware);
}
