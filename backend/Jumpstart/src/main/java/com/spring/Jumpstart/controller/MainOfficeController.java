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

import com.spring.Jumpstart.entity.Category;
import com.spring.Jumpstart.entity.Item;
import com.spring.Jumpstart.entity.ItemRetail;
import com.spring.Jumpstart.entity.ItemWare;
import com.spring.Jumpstart.entity.Retail;
import com.spring.Jumpstart.entity.Supplier;
import com.spring.Jumpstart.entity.SupplyRequest;
import com.spring.Jumpstart.entity.Warehouse;
import com.spring.Jumpstart.service.CategoryService;
import com.spring.Jumpstart.service.ItemRetailService;
import com.spring.Jumpstart.service.ItemService;
import com.spring.Jumpstart.service.ItemWareService;
import com.spring.Jumpstart.service.RetailService;
import com.spring.Jumpstart.service.SupplierService;
import com.spring.Jumpstart.service.SupplyRequestService;
import com.spring.Jumpstart.service.WarehouseService;

@RestController
@RequestMapping("/jumpstart/main")
@PreAuthorize("hasRole('MAIN')")
public class MainOfficeController {
	@Autowired
	ItemService itemService;
	
	@Autowired
	SupplierService suppService;
	
	@Autowired
	WarehouseService wareService;
	
	@Autowired
	RetailService retailService;
	
	@Autowired
	ItemWareService iwService;
	
	@Autowired
	ItemRetailService irService;
	
	@Autowired
	CategoryService catService;
	
	@Autowired
	SupplyRequestService srService;
	
	@GetMapping("/getitems/")
	public Collection<Item> showItemList(){
		return itemService.getAllItems();
	}
	@GetMapping("/getsuppliers/")
	public Collection<Supplier> showSupplierList(){
		return suppService.getAllSuppliers();
	}
	@PostMapping("/addretail/")
	public void addStore(@RequestBody Retail retail){
		retailService.addRetail(retail);
	}
	@PostMapping("/addwarehouse/")
	public void addWarehouse(@RequestBody Warehouse ware){
		wareService.addWarehouse(ware);
	}
	@PostMapping("/addsupplier/")
	public void addSupplier(@RequestBody Supplier supplier){
		suppService.addSupplier(supplier);
	}
	@PostMapping("/additem/")
	public void addItem(@RequestBody Item item){
		item.setAddedDate(new Date());
		itemService.addItem(item);
	}
	@GetMapping("/getwarehouses/")
	public Collection<Warehouse> showWarehouseList(){
		
		return wareService.getAllWarehouses();
	}
	@GetMapping("/getwarehouse/{id}")
	public Collection<Item> showWareInv(@PathVariable String id){
		int wid = Integer.parseInt(id);
		return itemService.getWarehouseInventory(wid);
	}
	@GetMapping("/getretailstores/")
	public Collection<Retail> showRetailStoreList(){
		return retailService.getAllRetails();
	}
	@GetMapping("/getretailstore/{id}")
	public Collection<Item> showRetailInv(@PathVariable String id){
		int rid = Integer.parseInt(id);
		return itemService.getRetailInventory(rid);
	}
	@GetMapping("/getnonincludeditem/{id}")
	public Collection<Item> getNonIncludedItem(@PathVariable String id){
		int rid = Integer.parseInt(id);
		return itemService.getNotWarehouseInventory(rid);
	}
	@PostMapping("/restock/")
	public void restocksWare(@RequestBody ItemWare iw){
		iwService.addStocks(iw);
	}
	
	@PostMapping("/additemtowarehouse/")
	public void addItemToWarehouse(@RequestBody ItemWare iw){
		iw.setItem(itemService.getItem(iw.getId().getItemid()));
		iw.setWarehouse(wareService.getWarehouse(iw.getId().getWarehouseid()));
		System.out.println(iw.toString());
		iwService.addItem(iw);
	}
	@PostMapping("/getsuppliableitems/{rid}/{wid}")
	public Collection<Item> getSuppliableItems(@PathVariable String rid, @PathVariable String wid){
		int reid = Integer.parseInt(rid);
		int waid = Integer.parseInt(wid);
		return itemService.getSuppliableItems(reid, itemService.getWarehouseInventory(waid));
	}
	
	@PostMapping("/sendstocks/")
	public void sendStocksFromWareouseToRetail(@RequestBody Collection<ItemWare> iwl){
		for(ItemWare iw : iwl) {
			ItemWare iwd = iwService.getById(iw.getId());
			iwd.setStocks(iwd.getStocks() - iw.getStocks());
			iwService.addItem(iwd);
		}
	}
	
	@PostMapping("/receivestocks/")
	public void receiveStocksFromWareouseToRetail(@RequestBody Collection<ItemRetail> irl){
		for(ItemRetail ir : irl) {
			ItemRetail ird = irService.getById(ir.getId());
			ird.setStocks(ir.getStocks() + ird.getStocks());
			irService.addStocks(ird);
		}
	}
	
	@GetMapping("/getcategories/")
	public Collection<Category> getCategories() {
		return catService.getAllCategories();
	}
	
	@GetMapping("/getrequests/")
	public Collection<SupplyRequest> getRequests() {
		return srService.getAllRequest();
	}
	
	@PostMapping("/deleterequests/")
	public void deleteRequests(@RequestBody SupplyRequest sRequest) {
		 srService.deleteRequest(sRequest);
	}
}
