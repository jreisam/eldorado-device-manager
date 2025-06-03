</br>
<p align="center">
  <img src="https://th.bing.com/th/id/R.8ec749c8d250d11998d5ba47ed54aad9?rik=T6D1vQrfQWe70g&riu=http%3a%2f%2fd1gkntzr8mxq7s.cloudfront.net%2f5c8a4bc876454.png&ehk=ayEtZ50vUJXJ17%2fcLSCfVqw2TYDlCfZALZ4XI4AJc4k%3d&risl=&pid=ImgRaw&r=0" width="140"/>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Eldorado Device Management

Projeto desafio para o Instituto Eldorado: um gerenciador de Dispositivos (e suas Categorias) com funcionalidades básicas.

_[EN] Challenge project for Eldorado Institute application: a Device (and its Categories) manager with basic features._

**Acesso ao projeto provisionado (AWS):**
- Frontend: [http://ec2-54-91-116-211.compute-1.amazonaws.com](http://ec2-54-91-116-211.compute-1.amazonaws.com)
- API / Swagger: [http://ec2-54-91-116-211.compute-1.amazonaws.com:3000/api](http://ec2-54-91-116-211.compute-1.amazonaws.com:3000/api)

## Stack Tecnológica

[NestJS (Node 22.16.0)](https://nestjs.com) Frontend

[Angular (20.0.0)](https://angular.dev) Backend

[MySQL (9.3)](https://www.mysql.com) Persistência de Dados

[Docker (4.40)](https://www.docker.com) Containerização

[AWS Cloud](https://aws.amazon.com) Provisionamento

## Execução Rápida

### Usando Docker (Recomendado)

Para executar toda a aplicação (frontend, backend e banco de dados) usando Docker:

```bash
# 1. Vá ao diretório raiz
cd eldorado-device-manager

# 2. Inicie todos os serviços com Docker Compose
docker compose up -d

# Para finalizar e remover os containers
docker compose down -v
```
A aplicação estará disponível em: [http://localhost](http://localhost)
### Usando NPM e GitBash

- _Tenha instalado o Node **22** ou superior (recomendo o uso do [NVM](https://github.com/nvm-sh/nvm))_
- _Tenha o MySQL instalado (**9** ou superior)_
- _Informe as credenciais de acesso ao banco de dados no prompt do script_

<p>Após instalar o Node, abra um prompt no GitBash e siga os passos:</p>

```bash
# 1. Vá ao diretório raiz do projeto
cd eldorado-device-manager

# 2. Execute o script 
./start-local.sh
```
### Infraestrutura como Código (IaC) para AWS CloudFormation via CDK
- _Local do script CDK: **./iac/lib/iac-stack.ts**, executar e publicar através dos comandos (dentro de ./iac):_
```bash
# Provisionar toda a infraestrutura
cdk bootstrap
# Publicar
cdk deploy
```
- _Local do template cloudFormation: **./iac/cloudformation/template.yaml**_
### Banco de Dados 
[ script MySQL também contido em - ./api/database/sql/00-struct-and-populate.sql ]
```bash
CREATE DATABASE IF NOT EXISTS dmdb;
USE dmdb;
CREATE TABLE IF NOT EXISTS categories (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            name VARCHAR(128) NOT NULL
);

CREATE TABLE IF NOT EXISTS devices (
                         id INT AUTO_INCREMENT PRIMARY KEY,
                         category_id INT NOT NULL,
                         color VARCHAR(16) NOT NULL,
                         part_number INT NOT NULL,
                         FOREIGN KEY (category_id) REFERENCES categories(id)
);

INSERT INTO categories (id, name)
VALUES (1,'Alpha'),
       (2,'Omega'),
       (3,'Beta');

INSERT INTO devices (id, category_id, color, part_number)
VALUES (1,1,'Azul',225),
       (2,1,'Cinza',6),
       (3,2,'Preto',27),
       (4,2,'Azul',16),
       (5,2,'Verde',55),
       (6,3,'Rosa',4),
       (7,3,'Branco',77),
       (8,3,'Preto',12),
       (9,3,'Laranja',10);

```
## Testes

```bash
 (WIP)
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Considerações Finais
Projeto feito em 4 dias para o desafio do Instituto Eldorado, visando demonstrar o conhecimento nas tecnologias envolvidas.

Abaixo segue a minha autoavaliação:

| Critério                                                                                                                                                             | Status |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------|
| api + web all done                                                                                                                                                   | DONE   |
| Category (id, name)                                                                                                                                                  | DONE   |
| Web app must have a menu with two options: Category Management, Device Management.                                                                                   | DONE   |
| You must implement Create, Read and Delete.                                                                                                                          | DONE   |
| Device -> Id: (generated automatically. Integer and incremental)                                                                                                     | DONE   |
| Device -> Category: A dropdown selection you can choose from all categories available.                                                                               | DONE   |
| Device -> Color: Text field, with validation (letters only, max size 16)                                                                                             | DONE   |
| Device -> partNumber:  positive integer field, with validation.                                                                                                      | DONE   |
| Category -> Id: (generated automatically, integer and incremental)                                                                                                   | DONE   |
| Category -> Name -> Must not be empty.                                                                                                                               | DONE   |
| Category -> Name -> Max size 128 chars.                                                                                                                              | DONE   |
| All Fields mandatory                                                                                                                                                 | DONE   |
| The APP must list all devices and categories, and also have screens/components that enable the user to create or remove new categories and devices.                  | DONE   |
| Front End must be implemented with the latest LTS Angular. ( >=18 )                                                                                                  | DONE   |
| Backend must be implemented in NodeJS (latest LTS).  ( 22.16.0 )                                                                                                     | DONE   |
| Automated tests on the backend is not mandatory but is a PLUS                                                                                                        | DONE   |
| Devices and Categories MUST be persisted on a MySQL database.                                                                                                        | DONE   |
| You must provide the script (SQL or any database versioning/migration script)  that can  create the database from scratch                                            | DONE   |
| Use GIT,  commit every progress you made, and share your code on a github public repository.at can  create the database from scratch                                 | DONE   |
| Deploy your project on a cloud provider (AWS, GCP, Heroku or any other), and send the URL of your web application, and the URL of your GIT repo.                     | DONE   |
| In case the project could not be deployed, it must be ready to run and install on a Ubuntu 18 linux machine ( via Docker ou npm - README)                            | DONE   |
| Clone the repo. (create the local database based on the script given). Run front end and back end locally.                                                           | DONE   |
| Use Docker to run the backend and database locally.                                                                                                                  | DONE   |
| Include an Infrastructure as Code (IaC) script (e.g., Terraform or CloudFormation) to provision any or all of the required infrastructure (such as EC2, RDS, or S3). | DONE   |
| Documentation - a clear and readable README file                                                                                                                     | DONE   |
| Code quality – Readability, structure, and maintainability of your code. (code has been "Linted" and revised)                                                        | DONE   |
| Project structure – Clear separation of concerns between frontend, backend, and database layers                                                                      | DONE   |
| Correctness – The app must meet the functional requirements (CRUD, validation, etc.).                                                                                | DONE   |
| Frontend usability – Basic usability, responsiveness, and a functional UI built with Angular.                                                                        | DONE   |
| API design – Clean and consistent REST endpoints ( OpenAPI via Swagger @ localhost:3000/api )                                                                        | DONE   |
| Database design – Proper use of relations and data constraints in MySQL                                                                                              | DONE   |
| Git usage – Clear and consistent commit history. ( Gitflow conventions applyed)                                                                                      | DONE   |
| Cloud deployment (AWS preferred)                                                                                                                                     | DONE   |
| Infrastructure as Code (Terraform, CloudFormation)                                                                                                                   | DONE   |
| Docker usage to simplify local setup                                                                                                                                 | DONE   |
| Automated backend tests                                                                                                                                              | DONE   |

_Autor: João Robson Reis Jr_

