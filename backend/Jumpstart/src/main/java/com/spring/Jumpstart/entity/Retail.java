package com.spring.Jumpstart.entity;

import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonManagedReference;


@Entity
public class Retail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int retail_id;
	
	private String location;
	private String des;
	
	@OneToMany(mappedBy = "retail", cascade = CascadeType.ALL)
	@JsonManagedReference(value="retail to item")
	private Collection<ItemRetail> itemRetails;
	
	
	@OneToMany(mappedBy = "retail", cascade = CascadeType.ALL)
	@JsonManagedReference(value="retail to account")
	private Collection<Account> accounts;
	
	public int getRetail_id() {
		return retail_id;
	}

	public void setRetail_id(int retail_id) {
		this.retail_id = retail_id;
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
	
	
	public Collection<ItemRetail> getItemRetails() {
		return itemRetails;
	}

	public void setItemRetails(Collection<ItemRetail> itemRetails) {
		this.itemRetails = itemRetails;
	}

	public Collection<Account> getAccounts() {
		return accounts;
	}

	public void setAccounts(Collection<Account> accounts) {
		this.accounts = accounts;
	}

	
	
}
