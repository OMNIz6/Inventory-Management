package com.spring.Jumpstart.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.spring.Jumpstart.entity.Account;

@Service
public interface AccountRepository extends JpaRepository<Account, Integer> {
	
	
	Optional<Account> findByEmail(String email);

	Boolean existsByEmail(String email);
}
