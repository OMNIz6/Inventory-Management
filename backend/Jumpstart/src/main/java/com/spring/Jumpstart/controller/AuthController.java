package com.spring.Jumpstart.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.Jumpstart.entity.Account;
import com.spring.Jumpstart.entity.ERole;
import com.spring.Jumpstart.entity.Role;
import com.spring.Jumpstart.jwt.JwtUtil;
import com.spring.Jumpstart.payload.request.LoginRequest;
import com.spring.Jumpstart.payload.request.RegisterRequest;
import com.spring.Jumpstart.payload.response.JwtResponse;
import com.spring.Jumpstart.payload.response.MessageResponse;
import com.spring.Jumpstart.repo.AccountRepository;
import com.spring.Jumpstart.repo.RoleRepository;
import com.spring.Jumpstart.user.UserDetailsImpl;

@RestController
@RequestMapping("/jumpstart/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	AccountRepository accRepo;

	@Autowired
	RoleRepository roleRepo;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtil jwtUtils;
	
	PasswordEncoder en = new BCryptPasswordEncoder();
	
	@PostMapping("/register/")
	public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request){
		if(accRepo.existsByEmail(request.getEmail())) {
			MessageResponse msg = new MessageResponse("Username is already taken!");
			return ResponseEntity.badRequest()
					.body(msg);
		}
		
		Account acc = new Account(request.getEmail(),en.encode(request.getPassword()));
		
		
		String strRole = request.getRole();
		Role role;
		switch (strRole) {
		case "main":
			role = roleRepo.findByName(ERole.ROLE_MAIN)
				.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			break;
		case "retail":
			role = roleRepo.findByName(ERole.ROLE_RETAIL)
				.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			break;
		default:
			role = roleRepo.findByName(ERole.ROLE_MAIN)
				.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			
		}
		acc.setRole(role);
		accRepo.save(acc);
		
		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
	
	@PostMapping("/login/")
	public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest request){
		Authentication auth = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
		
		SecurityContextHolder.getContext().setAuthentication(auth);
		
		String jwt = jwtUtils.ganerateJwtToken(auth);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
		
		List<String> roles = userDetails.getAuthorities().stream()
		        .map(item -> item.getAuthority())
		        .collect(Collectors.toList());
		
		return ResponseEntity.ok(new JwtResponse(jwt, 
                userDetails.getId(), 
                userDetails.getUsername(), 
                roles.get(0)));
	}
}
