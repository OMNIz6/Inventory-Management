package com.spring.Jumpstart.entity.key;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class ItemWareKey implements Serializable {
	
	private static final long serialVersionUID = 3007315150028961282L;

	@Column(name="item_id")
	int itemid;
	
	@Column(name="warehouse_id")
	int warehouseid;

	public int getItemid() {
		return itemid;
	}

	public void setItemid(int itemid) {
		this.itemid = itemid;
	}

	public int getWarehouseid() {
		return warehouseid;
	}

	public void setWarehouseid(int warehouseid) {
		this.warehouseid = warehouseid;
	}

	@Override
	public int hashCode() {
		return Objects.hash(itemid, warehouseid);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ItemWareKey other = (ItemWareKey) obj;
		return itemid == other.itemid && warehouseid == other.warehouseid;
	}
	
	
}
