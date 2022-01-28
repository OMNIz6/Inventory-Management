package com.spring.Jumpstart.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.Jumpstart.entity.ERole;
import com.spring.Jumpstart.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Integer>{
	
	Optional<Role> findByName(ERole name);
	
	
	
}
