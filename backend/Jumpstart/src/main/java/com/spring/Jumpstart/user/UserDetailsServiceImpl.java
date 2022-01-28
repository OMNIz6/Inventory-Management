package com.spring.Jumpstart.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring.Jumpstart.entity.Account;
import com.spring.Jumpstart.repo.AccountRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	@Autowired
	AccountRepository accRepo;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Account acc = accRepo.findByEmail(email)
				.orElseThrow(
						() -> new UsernameNotFoundException("User Not Found with username: " + email));
		
		return UserDetailsImpl.build(acc);
	}
	
	
}
