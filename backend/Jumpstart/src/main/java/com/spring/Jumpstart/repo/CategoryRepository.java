package com.spring.Jumpstart.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.Jumpstart.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer>  {

}
