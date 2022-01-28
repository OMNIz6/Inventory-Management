package com.spring.Jumpstart.repo;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.spring.Jumpstart.entity.Item;

public interface ItemRepository extends JpaRepository<Item, Integer>  {
	@Query(value ="select i from Item i join i.itemWare ir left join ir.warehouse w where  w.warehouse_id = :ID")
	public Collection<Item> findByWarehouseId(@Param("ID")int warehouse_id);
	
	@Query(value ="select i from Item i join i.itemRetail ir left join ir.retail r where  r.retail_id = :ID")
	public Collection<Item> findByRetailId(@Param("ID")int retail_id);
	
	@Query(value ="select i from Item i join i.itemWare ir left join ir.warehouse w where  w.warehouse_id <> :ID")
	public Collection<Item> findByNotWarehouseId(@Param("ID")int warehouse_id);
	
	@Query(value ="select i from Item i join i.itemRetail ir left join ir.retail r where  r.retail_id <> :ID")
	public Collection<Item> findByNotRetailId(@Param("ID")int retail_id);
	
	@Query(value ="select i from Item i join i.itemRetail ir left join ir.retail r where  r.retail_id = :ID and i in :Items")
	public Collection<Item> findByRetailIdAndItems(@Param("ID")int retail_id, @Param("Items")Collection<Item> items);
}
