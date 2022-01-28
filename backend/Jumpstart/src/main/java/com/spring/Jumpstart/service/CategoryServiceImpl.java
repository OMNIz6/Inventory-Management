package com.spring.Jumpstart.service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.Jumpstart.entity.Category;
import com.spring.Jumpstart.repo.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService{
	
	@Autowired
	CategoryRepository catRepo;
	
	@Override
	public Collection<Category> getAllCategories() {
		return catRepo.findAll();
	}

	@Override
	public Category addCategory(Category category) {
		return catRepo.save(category);
	}

	@Override
	public void deleteCategory(Category category) {
		// TODO Auto-generated method stub
		catRepo.delete(category);
	}

}
