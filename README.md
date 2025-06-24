# Clinic Registry

A secure, web-based clinical records management system designed for healthcare professionals. This full-stack application is built with Spring Boot on the backend and React on the frontend, leveraging a PostgreSQL relational database for persistent data storage.

Key features include:

## Authentication & Security
Implements JWT-based authentication and role-based access control (RBAC) to ensure only authorized users (e.g., doctors, administrators) can access or modify patient data.

## Patient Management
Supports creating, reading, updating, and viewing patient clinical records, including personal details, diagnoses, medical history, and clinical notes.

## Audit Trail (TODO)
Tracks all modifications to clinical records, logging the author, timestamp, and type of change, ensuring traceability and accountability.

## Data Filtering and Dashboard
Includes a searchable and filterable dashboard for quick access to patient records based on attributes such as diagnosis, hospital, or status.

## Statistics & Analytics
Provides real-time statistical views over the registered data, enabling aggregation by diagnosis category, hospital, or patient status.

## Data Privacy & Encryption (TODO)
Sensitive fields (e.g., name, diagnosis) encrypted using AES on the backend, and pseudonymization available for testing and reporting use cases.


## Tech Stack Overview

Backend: Spring Boot, Spring Security, JPA, JWT

Frontend: React, Material UI

Database: PostgreSQL

Tooling: Maven, Node.js

## 1. Demo

https://github.com/user-attachments/assets/3d9b0c6f-1ed8-4561-bcee-e7850d1cbda8



## 2. Setup & Run

### Requirements
Java 17+

Node.js 18+

Maven

Postgres

Recommended IDE: IntelliJ IDEA or VSCode

### Backend (Spring Boot)
Clone the repository

```sh
$ git clone https://github.com/danimnunes/clinic_registry.git
$ cd clinic_registry/clinic-registry-server
```
Configure the database connection
Edit the clinic-registry-server/src/main/resources/application.properties with your db credentials

Run

```sh
$ docker compose up --build
$ mvn clean install
$ mvn spring-boot:run
```


### Frontend (React)
Navigate to the frontend folder

```sh
$ cd clinic_registry/clinic-registry-frontend
```

Install dependencies

```sh
$ npm install
```

Run the application

```sh
$ npm start
```

The frontend will be available at: http://localhost:3000/login

