</br>
<p align="center">
  <img src="https://th.bing.com/th/id/R.8ec749c8d250d11998d5ba47ed54aad9?rik=T6D1vQrfQWe70g&riu=http%3a%2f%2fd1gkntzr8mxq7s.cloudfront.net%2f5c8a4bc876454.png&ehk=ayEtZ50vUJXJ17%2fcLSCfVqw2TYDlCfZALZ4XI4AJc4k%3d&risl=&pid=ImgRaw&r=0" width="140"/>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Eldorado Device Management

Projeto desafio para o Instituto Eldorado: um gerenciador de Dispositivos (e suas Categorias) com funcionalidades básicas.

_[EN] Challenge project for Eldorado Institute application: a Device (and its Categories) manager with basic features._

Swager: [http://localhost:3000/api](http://localhost:3000/api)

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

### Usando NPM e GitBash

- _Tenha instalado o Node **22** ou superior (recomendo o uso do [NVM](https://github.com/nvm-sh/nvm))_
- _Tenha o MySQL instalado (**9** ou superior)_

<p>Após instalar o Node, siga os passos:</p>

```bash
# 1. Vá ao diretório raiz do projeto
cd eldorado-device-manager

# 2. Execute o script 
./start-local.sh
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
