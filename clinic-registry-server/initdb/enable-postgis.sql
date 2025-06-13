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
    diagnosis_category VARCHAR(100),
    hospital VARCHAR(100),
    active BOOLEAN DEFAULT TRUE
);

CREATE TABLE health_record (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    record_date TIMESTAMP NOT NULL,
    record_type VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    patient_id BIGINT NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES patient(id)
);

CREATE TABLE note (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    note_date TIMESTAMP NOT NULL,
    content TEXT NOT NULL,
    patient_id BIGINT NOT NULL,
    author_id BIGINT NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES patient(id),
    FOREIGN KEY (author_id) REFERENCES cr_user(id)
);

INSERT INTO role (name) VALUES ('ROLE_ADMIN'), ('ROLE_DOCTOR');

-- user "admin" with (BCrypt) password "admin123"
INSERT INTO cr_user (username, password) VALUES ('admin', '$2a$12$Lov9WaNr./0y3/1hhOBLLebc28n2.iMJ1D.wKdvubGS0j2jOmTzqG');

-- user "doctor1" with (BCrypt) password "doctor1"
INSERT INTO cr_user (username, password) VALUES ('doctor1', '$2a$12$.nl6n61vYmYl/JTLiuokGuP2eLjVxJvTQS66Ji5Ncvkb38FopTI5i');

-- user "doctor2" with (BCrypt) password "doctor2"
INSERT INTO cr_user (username, password) VALUES ('doctor2', '$2a$12$1iBgWeYIOOo0IxAvF7wOeOx707znBl/1zDZr5GEKnjG7B9ZzZsHDS');

-- user "doctor3" with (BCrypt) password "doctor3"
INSERT INTO cr_user (username, password) VALUES ('doctor3', '$2a$12$PyqROqUXXWnrkqbBrywkL.sNxoK9vniRerT9IGch1TnjeryhCOCBu');

-- user "doctor4" with (BCrypt) password "doctor4"
INSERT INTO cr_user (username, password) VALUES ('doctor4', '$2a$12$zcbD.GG.dqMZr5YMm6Sllu7uRZVJxlHY9MMvpr6F5KfFdvSJV17WO');

-- user "doctor5" with (BCrypt) password "doctor5"
INSERT INTO cr_user (username, password) VALUES ('doctor5', '$2a$12$hOXCZB/ornINDP/iXxnWteqzrXZUNsnPtq6e40B3ES8UzFgFqzxe2');

INSERT INTO user_roles (cr_user_id, role_id) VALUES (1, 1); -- admin with ROLE_ADMIN
INSERT INTO user_roles (cr_user_id, role_id) VALUES (2, 2); -- doctor1 with ROLE_DOCTOR
INSERT INTO user_roles (cr_user_id, role_id) VALUES (3, 2); -- doctor2 with ROLE_DOCTOR
INSERT INTO user_roles (cr_user_id, role_id) VALUES (4, 2); -- doctor3 with ROLE_DOCTOR
INSERT INTO user_roles (cr_user_id, role_id) VALUES (5, 2); -- doctor4 with ROLE_DOCTOR
INSERT INTO user_roles (cr_user_id, role_id) VALUES (6, 2); -- doctor5 with ROLE_DOCTOR



INSERT INTO patient (name, birth_date, diagnosis, diagnosis_category, hospital, active) VALUES
  ('Maria Silva', '2015-06-01', 'Doença crónica rara', 'Outros', 'Hospital de Santa Maria', true),
  ('João Pereira', '2010-09-15', 'Cardiopatia congénita', 'Cardiovascular', 'Hospital de Santa Maria', true),
  ('Ana Costa', '2012-03-22', 'Diabetes tipo 1', 'Metabólico', 'Hospital Garcia de Orta', true),
  ('Carlos Nogueira', '2008-11-03', 'Epilepsia', 'Neurológico', 'Hospital de Santa Maria', false),
  ('Rita Lopes', '2016-07-29', 'Alergia alimentar grave', 'Imunológico', 'Hospital de Santa Maria', true),
  ('Tiago Fernandes', '2014-01-05', 'Síndrome de Guillain-Barré', 'Neurológico', 'Hospital de Santa Maria', true),
  ('Inês Martins', '2009-06-18', 'Paralisia cerebral', 'Neurológico', 'Hospital de Santa Maria', true),
  ('Pedro Rocha', '2013-10-09', 'Deficiência visual congénita', 'Sensorial', 'Hospital Garcia de Orta', true),
  ('Beatriz Almeida', '2011-02-12', 'Doença de Crohn', 'Gastrointestinal', 'Hospital Garcia de Orta', false),
  ('Miguel Tavares', '2007-08-30', 'Cardiopatia dilatada', 'Cardiovascular', 'Hospital CUF Descobertas', true),
  ('Sofia Mendes', '2017-12-01', 'Atraso do desenvolvimento', 'Desenvolvimento', 'Hospital de Setúbal', true),
  ('Luís Costa', '2018-04-20', 'Autismo severo', 'Neurodesenvolvimento', 'Hospital Garcia de Orta', true),
  ('Clara Martins', '2019-05-15', 'Síndrome de Down', 'Genético', 'Hospital Garcia de Orta', true),
  ('André Santos', '2020-08-10', 'Surdez profunda', 'Sensorial', 'Hospital de Leiria', true),
  ('Sara Oliveira', '2021-11-25', 'Doença pulmonar crónica', 'Respiratório', 'Hospital Garcia de Orta', true),
  ('Ricardo Gomes', '2022-02-14', 'TDAH', 'Neuropsiquiátrico', 'Hospital Garcia de Orta', true),
  ('Laura Pires', '2023-03-30', 'Atrofia muscular espinhal', 'Neuromuscular', 'Hospital de Viseu', true),
  ('Filipe Dias', '2014-10-05', 'Síndrome genético raro', 'Genético', 'Hospital de Viseu', true),
  ('Helena Sousa', '2015-12-20', 'Epilepsia', 'Neurológico', 'Hospital de Santa Maria', true),
  ('Gonçalo Reis', '2016-09-15', 'Transtorno bipolar', 'Neuropsiquiátrico', 'Hospital de Viseu', true),
  ('Patrícia Martins', '2017-01-10', 'Ansiedade grave', 'Neuropsiquiátrico', 'Hospital de Viseu', true),
  ('Bruno Silva', '2018-03-05', 'Distúrbio de impulsos', 'Neuropsiquiátrico', 'Hospital de Funchal', true),
  ('Catarina Costa', '2019-06-25', 'Transtorno de stress', 'Neuropsiquiátrico', 'Hospital de Funchal', true),
  ('Vasco Almeida', '2020-08-30', 'TDAH', 'Neuropsiquiátrico', 'Hospital de Santa Maria', true),
  ('Joana Martins', '2021-11-15', 'Anorexia nervosa', 'Neuropsiquiátrico', 'Hospital de Vila Real', true),
  ('Ricardo Nunes', '2022-02-05', 'TOC severo', 'Neuropsiquiátrico', 'Hospital de Vila Real', true);

INSERT INTO health_record (record_date, record_type, description, patient_id) VALUES
  ('2024-06-01 10:00:00', 'Consulta', 'Avaliação inicial da condição crónica.',1),
  ('2024-06-10 14:00:00', 'Exame', 'Exame de imagem ao crânio.',1),
  ('2024-05-22 09:30:00', 'Consulta', 'Seguimento da cardiopatia.',2),
  ('2024-05-30 11:00:00', 'Tratamento', 'Sessão de fisioterapia.',2),
  ('2024-06-05 10:45:00', 'Consulta', 'Monitorização de glicemia.',3),
  ('2024-06-07 12:00:00', 'Exame', 'Análise de sangue completa.',3);

INSERT INTO health_record (record_date, record_type, description, patient_id) VALUES ('2024-06-05 10:00:00', 'Consulta', 'Início de plano terapêutico.',4);
INSERT INTO health_record (record_date, record_type, description, patient_id) VALUES ('2024-06-07 13:00:00', 'Consulta', 'Realização de testes laboratoriais.',4);
INSERT INTO health_record (record_date, record_type, description, patient_id) VALUES ('2024-06-10 12:00:00', 'Exame', 'Realização de testes laboratoriais.',5);
INSERT INTO health_record (record_date, record_type, description, patient_id) VALUES ('2024-06-05 12:00:00', 'Consulta', 'Realização de testes laboratoriais.',5);
INSERT INTO health_record (record_date, record_type, description, patient_id) VALUES ('2024-06-07 10:00:00', 'Consulta', 'Exame complementar solicitado.',6);
INSERT INTO health_record (record_date, record_type, description, patient_id) VALUES ('2024-06-07 09:00:00', 'Encaminhamento', 'Realização de testes laboratoriais.',6);
INSERT INTO health_record (record_date, record_type, description, patient_id) VALUES ('2024-06-04 09:00:00', 'Consulta', 'Encaminhamento para especialista.',7);
INSERT INTO health_record (record_date, record_type, description, patient_id) VALUES ('2024-06-02 12:00:00', 'Tratamento', 'Início de plano terapêutico.',7);
INSERT INTO health_record (record_date, record_type, description, patient_id) VALUES ('2024-06-09 11:00:00', 'Consulta', 'Acompanhamento da condição.',8);
INSERT INTO health_record (record_date, record_type, description, patient_id) VALUES ('2024-06-08 13:00:00', 'Exame', 'Início de plano terapêutico.',8);
INSERT INTO health_record (record_date, record_type, description, patient_id) VALUES ('2024-06-02 09:00:00', 'Tratamento', 'Início de plano terapêutico.',9);
INSERT INTO health_record (record_date, record_type, description, patient_id) VALUES ('2024-06-08 12:00:00', 'Tratamento', 'Exame complementar solicitado.',9);
INSERT INTO health_record (record_date, record_type, description, patient_id) VALUES ('2024-06-06 09:00:00', 'Consulta', 'Acompanhamento da condição.',10);
INSERT INTO health_record (record_date, record_type, description, patient_id) VALUES ('2024-06-11 12:00:00', 'Consulta', 'Encaminhamento para especialista.',10);

INSERT INTO note (note_date, content, patient_id, author_id) VALUES
  ('2024-06-01 15:00:00', 'Paciente colaborativo e estável.',1,2),
  ('2024-06-02 16:00:00', 'Recomenda-se avaliação psicológica.',1,2),
  ('2024-06-03 09:00:00', 'Novo plano terapêutico iniciado.',2,3),
  ('2024-06-04 10:30:00', 'Paciente apresentou melhorias motoras.',2,3),
  ('2024-06-05 11:15:00', 'Necessita de maior apoio familiar.',3,2);

INSERT INTO note (note_date, content, patient_id, author_id) VALUES ('2024-06-05 11:00:00', 'Foram observadas melhorias ligeiras.',4,4);
INSERT INTO note (note_date, content, patient_id, author_id) VALUES ('2024-06-07 16:00:00', 'Paciente respondeu bem ao tratamento.',4,2);
INSERT INTO note (note_date, content, patient_id, author_id) VALUES ('2024-06-10 15:00:00', 'A família está envolvida no processo.',5,4);
INSERT INTO note (note_date, content, patient_id, author_id) VALUES ('2024-06-05 14:00:00', 'Paciente respondeu bem ao tratamento.',5,3);
INSERT INTO note (note_date, content, patient_id, author_id) VALUES ('2024-06-07 11:00:00', 'Sugere-se apoio psicológico contínuo.',6,5);
INSERT INTO note (note_date, content, patient_id, author_id) VALUES ('2024-06-07 10:00:00', 'Sugere-se apoio psicológico contínuo.',6,5);
INSERT INTO note (note_date, content, patient_id, author_id) VALUES ('2024-06-04 10:00:00', 'Paciente respondeu bem ao tratamento.',7,4);
INSERT INTO note (note_date, content, patient_id, author_id) VALUES ('2024-06-02 14:00:00', 'Foram observadas melhorias ligeiras.',7,3);
INSERT INTO note (note_date, content, patient_id, author_id) VALUES ('2024-06-09 14:00:00', 'Paciente demonstrou resistência à terapêutica.',8,4);
INSERT INTO note (note_date, content, patient_id, author_id) VALUES ('2024-06-08 15:00:00', 'Paciente demonstrou resistência à terapêutica.',8,5);
INSERT INTO note (note_date, content, patient_id, author_id) VALUES ('2024-06-02 12:00:00', 'Sugere-se apoio psicológico contínuo.',9,4);
INSERT INTO note (note_date, content, patient_id, author_id) VALUES ('2024-06-08 13:00:00', 'Sugere-se apoio psicológico contínuo.',9,4);
INSERT INTO note (note_date, content, patient_id, author_id) VALUES ('2024-06-06 11:00:00', 'A família está envolvida no processo.',10,5);
INSERT INTO note (note_date, content, patient_id, author_id) VALUES ('2024-06-11 15:00:00', 'A família está envolvida no processo.',10,3);





