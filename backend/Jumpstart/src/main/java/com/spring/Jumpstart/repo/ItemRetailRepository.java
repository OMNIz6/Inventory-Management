package com.spring.Jumpstart.repo;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.spring.Jumpstart.entity.ItemRetail;
import com.spring.Jumpstart.entity.key.ItemRetailKey;

@Repository
public interface ItemRetailRepository extends JpaRepository<ItemRetail, ItemRetailKey>  {
	@Query(value ="select a,i from ItemRetail a join a.retail r left join a.item i where r.retail_id = :ID")
	public Collection<ItemRetail> findByRetailId(@Param("ID")int retailId);
}
