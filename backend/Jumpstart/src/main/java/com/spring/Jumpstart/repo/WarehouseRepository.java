package com.spring.Jumpstart.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.Jumpstart.entity.Warehouse;

public interface WarehouseRepository extends JpaRepository<Warehouse, Integer> {

}
