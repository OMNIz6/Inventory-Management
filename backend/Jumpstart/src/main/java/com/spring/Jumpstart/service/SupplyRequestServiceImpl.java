package com.spring.Jumpstart.service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.Jumpstart.entity.SupplyRequest;
import com.spring.Jumpstart.repo.SupplyRequestRepository;

@Service
public class SupplyRequestServiceImpl implements SupplyRequestService {
	@Autowired
	SupplyRequestRepository srRepo;

	@Override
	public Collection<SupplyRequest> getAllRequest() {
		return srRepo.findAll();
	}

	@Override
	public void addRequest(SupplyRequest request) {
		srRepo.save(request);
	}

	@Override
	public void deleteRequest(SupplyRequest request) {
		srRepo.delete(request);
		
	}

	@Override
	public Collection<SupplyRequest> getByRetailId(int rid) {
		return srRepo.findByRetailId(rid);
	}
	
}
