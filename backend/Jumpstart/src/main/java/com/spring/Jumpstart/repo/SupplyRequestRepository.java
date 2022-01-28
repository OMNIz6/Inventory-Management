package com.spring.Jumpstart.repo;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.spring.Jumpstart.entity.SupplyRequest;

public interface SupplyRequestRepository extends JpaRepository<SupplyRequest, Integer>{
	@Query(value ="select s,i from SupplyRequest s join s.retail r left join s.items i where r.retail_id = :ID")
	public Collection<SupplyRequest> findByRetailId(@Param("ID")int retailId);
}
