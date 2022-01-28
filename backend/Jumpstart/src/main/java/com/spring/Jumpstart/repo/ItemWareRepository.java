package com.spring.Jumpstart.repo;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.spring.Jumpstart.entity.ItemWare;
import com.spring.Jumpstart.entity.key.ItemWareKey;

@Repository
public interface ItemWareRepository extends JpaRepository<ItemWare, ItemWareKey>  {
	@Query(value ="select a,i from ItemWare a join a.warehouse w left join a.item i where  w.warehouse_id = :ID")
	public Collection<ItemWare> findByWarehouseId(@Param("ID")int warehouse_id);
}
