package com.spring.Jumpstart.service;

import java.util.Collection;

import com.spring.Jumpstart.entity.Supplier;

public interface SupplierService {
	public Collection<Supplier> getAllSuppliers();
	public Supplier addSupplier(Supplier supplier);
	public void deleteSupplier(Supplier supplier);
}
