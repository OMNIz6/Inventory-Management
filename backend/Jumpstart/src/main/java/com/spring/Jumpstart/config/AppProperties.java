package com.spring.Jumpstart.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public class AppProperties {
	private final Auth auth = new Auth();//Local Login Authentication
	
	public Auth getAuth() {
		return auth;
	}
}
