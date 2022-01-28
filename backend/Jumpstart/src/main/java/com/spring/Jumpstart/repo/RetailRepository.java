package com.spring.Jumpstart.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.Jumpstart.entity.Retail;

public interface RetailRepository extends JpaRepository<Retail, Integer> {
	public Retail findByAccountsEmail(String email);
}
