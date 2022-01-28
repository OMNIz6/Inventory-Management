package com.spring.Jumpstart.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.Jumpstart.entity.Supplier;

public interface SupplierRepository extends JpaRepository<Supplier, Integer>  {

}
