-- ./initdb/enable-postgis.sql
CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE role (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE cr_user (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    enabled BOOLEAN DEFAULT TRUE
);

CREATE TABLE user_roles (
    cr_user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    PRIMARY KEY (cr_user_id, role_id),
    FOREIGN KEY (cr_user_id) REFERENCES cr_user(id),
    FOREIGN KEY (role_id) REFERENCES role(id)
);

CREATE TABLE patient (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL,
    diagnosis VARCHAR(255),
    hospital VARCHAR(100),
    active BOOLEAN DEFAULT TRUE
);

INSERT INTO role (name) VALUES ('ROLE_ADMIN'), ('ROLE_DOCTOR');

-- user "admin" with (BCrypt) password "admin123"
INSERT INTO cr_user (username, password) VALUES ('admin', '$2a$12$Lov9WaNr./0y3/1hhOBLLebc28n2.iMJ1D.wKdvubGS0j2jOmTzqG');

-- user "doctor1" with (BCrypt) password "doctor1"
INSERT INTO cr_user (username, password) VALUES ('doctor1', '$2a$12$.nl6n61vYmYl/JTLiuokGuP2eLjVxJvTQS66Ji5Ncvkb38FopTI5i');

-- user "doctor2" with (BCrypt) password "doctor2"
INSERT INTO cr_user (username, password) VALUES ('doctor2', '$2a$12$1iBgWeYIOOo0IxAvF7wOeOx707znBl/1zDZr5GEKnjG7B9ZzZsHDS');

INSERT INTO user_roles (cr_user_id, role_id) VALUES (1, 1); -- admin with ROLE_ADMIN
INSERT INTO user_roles (cr_user_id, role_id) VALUES (2, 2); -- doctor1 with ROLE_DOCTOR
INSERT INTO user_roles (cr_user_id, role_id) VALUES (3, 2); -- doctor2 with ROLE_DOCTOR

INSERT INTO patient (name, birth_date, diagnosis, hospital, active)
VALUES 
  ('Maria Silva', '2015-06-01', 'Doença crónica rara', 'Hospital Santa Maria', true),
  ('João Pereira', '2010-09-15', 'Asma moderada', 'Hospital São João', true),
  ('Ana Costa', '2012-03-22', 'Diabetes tipo 1', 'Hospital da Luz', true),
  ('Carlos Nogueira', '2008-11-03', 'Epilepsia', 'Hospital Santa Maria', false),
  ('Rita Lopes', '2016-07-29', 'Alergia alimentar grave', 'Hospital Pediátrico de Coimbra', true),
  ('Tiago Fernandes', '2014-01-05', 'Doença autoimune rara', 'Hospital de Braga', true),
  ('Inês Martins', '2009-06-18', 'Paralisia cerebral', 'Centro Hospitalar Universitário do Porto', true),
  ('Pedro Rocha', '2013-10-09', 'Deficiência visual congénita', 'Hospital Garcia de Orta', true),
  ('Beatriz Almeida', '2011-02-12', 'Doença de Crohn', 'Hospital de Faro', false),
  ('Miguel Tavares', '2007-08-30', 'Doença cardíaca congénita', 'Hospital CUF Descobertas', true),
  ('Sofia Mendes', '2017-12-01', 'Atraso no desenvolvimento', 'Hospital de Setúbal', true),
  ('Luís Costa', '2018-04-20', 'Transtorno do espectro autista', 'Hospital de Évora', true),
  ('Clara Martins', '2019-05-15', 'Síndrome de Down', 'Hospital de Vila Nova de Gaia', true),
  ('André Santos', '2020-08-10', 'Deficiência auditiva severa', 'Hospital de Leiria', true),
  ('Sara Oliveira', '2021-11-25', 'Doença pulmonar crónica', 'Hospital de Portimão', true),
  ('Ricardo Gomes', '2022-02-14', 'Transtorno de déficit de atenção', 'Hospital de Santarém', true),
  ('Laura Pires', '2023-03-30', 'Doença neuromuscular rara', 'Hospital de Viseu', true),
  ('Filipe Dias', '2014-10-05', 'Transtorno obsessivo-compulsivo', 'Hospital de Castelo Branco', true),
  ('Helena Sousa', '2015-12-20', 'Esclerose múltipla', 'Hospital de Guarda', true),
  ('Gonçalo Reis', '2016-09-15', 'Transtorno bipolar', 'Hospital de Ponta Delgada', true),
  ('Patrícia Martins', '2017-01-10', 'Transtorno de ansiedade generalizada', 'Hospital de Angra do Heroísmo', true),
  ('Bruno Silva', '2018-03-05', 'Transtorno de personalidade borderline', 'Hospital de Funchal', true),
  ('Catarina Costa', '2019-06-25', 'Transtorno de estresse pós-traumático', 'Hospital de Horta', true),
  ('Vasco Almeida', '2020-08-30', 'Transtorno de déficit de atenção e hiperatividade', 'Hospital de Santa Cruz', true),
  ('Joana Martins', '2021-11-15', 'Transtorno alimentar grave', 'Hospital de Vila Real', true),
  ('Ricardo Nunes', '2022-02-05', 'Transtorno obsessivo-compulsivo leve', 'Hospital de Bragança', true);

