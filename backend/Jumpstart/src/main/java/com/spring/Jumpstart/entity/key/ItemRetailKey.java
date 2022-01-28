package com.spring.Jumpstart.entity.key;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Embeddable;

@Embeddable
public class ItemRetailKey implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private int itemId;
	private int retailId;
	
	public int getItemId() {
		return itemId;
	}
	public void setItemId(int itemId) {
		this.itemId = itemId;
	}
	public int getRetailId() {
		return retailId;
	}
	public void setRetailId(int retailId) {
		this.retailId = retailId;
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(itemId, retailId);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (!(obj instanceof ItemRetailKey)) {
			return false;
		}
		ItemRetailKey other = (ItemRetailKey) obj;
		return itemId == other.itemId && retailId == other.retailId;
	}
	@Override
	public String toString() {
		return "ItemRetailKey [itemId=" + itemId + ", retailId=" + retailId + "]";
	}
	
	
}