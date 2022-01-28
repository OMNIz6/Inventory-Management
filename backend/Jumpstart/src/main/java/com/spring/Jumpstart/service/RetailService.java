package com.spring.Jumpstart.service;

import java.util.Collection;

import com.spring.Jumpstart.entity.Retail;

public interface RetailService {
	public Collection<Retail> getAllRetails();
	public Retail getStore(int id);
	public Retail getStore(String email);
	public Retail addRetail(Retail retail);
	public void deleteRetail(Retail retail);
}
