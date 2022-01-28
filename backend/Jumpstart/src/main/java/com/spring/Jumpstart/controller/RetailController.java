package com.spring.Jumpstart.controller;

import java.util.Collection;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.Jumpstart.entity.Item;
import com.spring.Jumpstart.entity.ItemRetail;
import com.spring.Jumpstart.entity.Retail;
import com.spring.Jumpstart.entity.SupplyRequest;
import com.spring.Jumpstart.service.ItemRetailService;
import com.spring.Jumpstart.service.ItemService;
import com.spring.Jumpstart.service.RetailService;
import com.spring.Jumpstart.service.SupplyRequestService;

@RestController
@RequestMapping("/jumpstart/retail")
@PreAuthorize("hasRole('RETAIL')")
public class RetailController {
	@Autowired
	RetailService retailService;
	
	@Autowired
	ItemService itemService;
	
	@Autowired
	ItemRetailService irService;
	
	@Autowired
	SupplyRequestService srService;
	
	@GetMapping("/getstore/{email}")
	public Retail showStoreInv(@PathVariable String email){

		return retailService.getStore(email);
	}
	@GetMapping("/getstorebyid/{id}")
	public Retail showStoreInvById(@PathVariable String id){
		int rid = Integer.parseInt(id);
		
		return retailService.getStore(rid);
	}
	@GetMapping("/getretailstore/{id}")
	public Collection<Item> showRetailInv(@PathVariable String id){
		int rid = Integer.parseInt(id);
		return itemService.getRetailInventory(rid);
	}
	
	@GetMapping("/getretailrequests/{id}")
	public Collection<SupplyRequest> getRequestsByRetail(@PathVariable String id) {
		System.out.println(id);
		int rid = Integer.parseInt(id);
		return srService.getByRetailId(rid);
	}
	
	@PostMapping("/makerequests/")
	public void makeRequests(@RequestBody SupplyRequest sRequest) {
		sRequest.setDate(new Date());
		srService.addRequest(sRequest);
	}
	
	@PostMapping("/deleterequests/")
	public void deleteRequests(@RequestBody SupplyRequest sRequest) {
		 srService.deleteRequest(sRequest);
	}
	
	@GetMapping("/getnonincludeditem/{id}")
	public Collection<Item> getNonIncludedItem(@PathVariable String id){
		System.out.println("in the api to get item");
		int rid = Integer.parseInt(id);
		return itemService.getNotRetailInventory(rid);
	}
	
	@PostMapping("/additemtostore/")
	public void addItemToWarehouse(@RequestBody ItemRetail ir){
		System.out.println("in the api");
		ir.setItem(itemService.getItem(ir.getId().getItemId()));
		ir.setRetail(retailService.getStore(ir.getId().getRetailId()));
		irService.addStocks(ir);
	}
	
	@PostMapping("/deleteitem/")
	public void deleteItem(@RequestBody ItemRetail ir) {
		 irService.delateItem(ir);
	}
}
