package com.spring.Jumpstart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.spring.Jumpstart.config.AppProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class JumpstartApplication {

	public static void main(String[] args) {
		SpringApplication.run(JumpstartApplication.class, args);
	}

}
