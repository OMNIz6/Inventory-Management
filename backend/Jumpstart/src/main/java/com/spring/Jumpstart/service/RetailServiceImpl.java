package com.spring.Jumpstart.service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.Jumpstart.entity.Retail;
import com.spring.Jumpstart.repo.RetailRepository;

@Service
public class RetailServiceImpl implements RetailService{
	
	@Autowired
	RetailRepository retailRepo;

	@Override
	public Collection<Retail> getAllRetails() {
		return retailRepo.findAll();
	}

	@Override
	public Retail addRetail(Retail retail) {
		return retailRepo.save(retail);
	}

	@Override
	public void deleteRetail(Retail retail) {
		retailRepo.delete(retail);
	}

	@Override
	public Retail getStore(String email) {
		return retailRepo.findByAccountsEmail(email);
	}

	@Override
	public Retail getStore(int id) {
		return retailRepo.findById(id).get();
	}

}
