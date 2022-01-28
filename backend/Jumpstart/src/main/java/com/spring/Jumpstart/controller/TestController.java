package com.spring.Jumpstart.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {
	@GetMapping("/all")
	  public String allAccess() {
	    return "Public Content.";
	  }

	  @GetMapping("/retail")
	  @PreAuthorize("hasRole('RETAIL')")
	  public String moderatorAccess() {
	    return "RETAIL Board.";
	  }

	  @GetMapping("/main")
	  @PreAuthorize("hasRole('MAIN')")
	  public String adminAccess() {
	    return "MAIN Board.";
	  }
}
