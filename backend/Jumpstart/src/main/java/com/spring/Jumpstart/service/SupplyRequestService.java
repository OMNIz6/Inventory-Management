package com.spring.Jumpstart.service;

import java.util.Collection;


import com.spring.Jumpstart.entity.SupplyRequest;

public interface SupplyRequestService {
	public Collection<SupplyRequest> getAllRequest();
	
	public void addRequest(SupplyRequest request);
	
	public void deleteRequest(SupplyRequest request);
	
	public Collection<SupplyRequest> getByRetailId(int rid);
}
