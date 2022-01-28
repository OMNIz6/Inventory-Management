package com.spring.Jumpstart.service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.Jumpstart.entity.Supplier;
import com.spring.Jumpstart.repo.SupplierRepository;

@Service
public class SupplierServiceImpl implements SupplierService{
	@Autowired
	SupplierRepository suppRepo;

	@Override
	public Collection<Supplier> getAllSuppliers() {
		return suppRepo.findAll();
	}

	@Override
	public Supplier addSupplier(Supplier supplier) {
		return suppRepo.save(supplier);
	}

	@Override
	public void deleteSupplier(Supplier supplier) {
		suppRepo.delete(supplier);
	}
}
