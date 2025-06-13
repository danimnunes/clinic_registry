# Clinic Registry

## A secure web-based clinical records management system for healthcare professionals. Built with Spring Boot (backend) and React (frontend), it supports JWT authentication and role-based access control. The system includes a PostgreSQL database and offers a responsive user interface designed with Material UI.

## 1. Demo



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

