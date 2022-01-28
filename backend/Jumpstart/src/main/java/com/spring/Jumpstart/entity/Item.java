
package com.spring.Jumpstart.entity;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Item {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int item_id;
	
	private String name;
	private String des;
	private BigDecimal price;
	private Date addedDate;
	
	@ManyToOne
	@JoinColumn(name="acc_id")
	private Account acc;
	
	@ManyToOne
	@JoinColumn(name="category_id")
	private Category category;
	
	@ManyToOne
	@JoinColumn(name="supplier_id")
	private Supplier supplier;
	
	@OneToMany(mappedBy = "item")
	@JsonManagedReference(value="item to warehouse")
	private Set<ItemWare> itemWare;
	
	@OneToMany(mappedBy = "item")
	@JsonManagedReference(value="item to retail")
	private Set<ItemRetail> itemRetail;
	
	@ManyToMany(mappedBy = "items")
	@JsonIgnore
	Set<SupplyRequest> requests;
	
	public Item() {
	}

	public Item(String name, String des, BigDecimal price, Category category, Supplier supplier) {
		super();
		this.name = name;
		this.des = des;
		this.price = price;
		this.category = category;
		this.supplier = supplier;
	}
	
	public int getItem_id() {
		return item_id;
	}
	public void setItem_id(int item_id) {
		this.item_id = item_id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDes() {
		return des;
	}
	public void setDes(String des) {
		this.des = des;
	}
	public BigDecimal getPrice() {
		return price;
	}
	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public Date getAddedDate() {
		return addedDate;
	}

	public void setAddedDate(Date addedDate) {
		this.addedDate = addedDate;
	}

	public Account getAcc() {
		return acc;
	}

	public void setAcc(Account acc) {
		this.acc = acc;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Supplier getSupplier() {
		return supplier;
	}

	public void setSupplier(Supplier supplier) {
		this.supplier = supplier;
	}

	public Set<ItemWare> getItemWare() {
		return itemWare;
	}
	
	public void setItemWare(Set<ItemWare> itemWare) {
		this.itemWare = itemWare;
	}

	public Set<ItemRetail> getItemRetail() {
		return itemRetail;
	}

	public void setItemRetail(Set<ItemRetail> itemRetail) {
		this.itemRetail = itemRetail;
	}
	
	
}
