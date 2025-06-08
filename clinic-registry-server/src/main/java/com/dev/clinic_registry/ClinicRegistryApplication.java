package com.dev.clinic_registry;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.JdbcConnectionDetails;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ClinicRegistryApplication {

	public static void main(String[] args) {
		SpringApplication.run(ClinicRegistryApplication.class, args);
	}

	/*@Bean
	CommandLineRunner commandLineRunner(JdbcConnectionDetails jdbcConnectionDetails) {
		return args -> {
			// This is a placeholder for any command line logic you might want to execute
			System.out.println("Clinic Registry Application started successfully!");
			System.out.println("Database URL: " + jdbcConnectionDetails.getJdbcUrl());
		};
	}*/

}

