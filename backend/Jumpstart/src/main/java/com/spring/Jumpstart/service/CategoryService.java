package com.spring.Jumpstart.service;

import java.util.Collection;

import com.spring.Jumpstart.entity.Category;

public interface CategoryService {

	public Collection<Category> getAllCategories();
	public Category addCategory(Category category);
	public void deleteCategory(Category category);
	
}
