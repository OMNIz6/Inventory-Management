package com.spring.Jumpstart.entity;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Warehouse {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int warehouse_id;
	
	private String location;
	private String des;
	
	@OneToMany(mappedBy = "warehouse")
	@JsonManagedReference(value="warehouse to item")
	private Set<ItemWare> itemWares;
	
	public int getWarehouse_id() {
		return warehouse_id;
	}

	public void setWarehouse_id(int warehouse_id) {
		this.warehouse_id = warehouse_id;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getDes() {
		return des;
	}

	public void setDes(String des) {
		this.des = des;
	}

	public Set<ItemWare> getItemWares() {
		return itemWares;
	}

	public void setItemWare(Set<ItemWare> itemWares) {
		this.itemWares = itemWares;
	}
	
	
}
