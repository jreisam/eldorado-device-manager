import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let server: any;

  // Configuração antes de todos os testes
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Configurar a aplicação igual à aplicação principal
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    await app.init();
    server = app.getHttpServer();
  });

  // Limpeza após todos os testes
  afterAll(async () => {
    await app.close();
  });

  // Teste básico da rota raiz
  describe('/ (GET)', () => {
    it('should return "Hello World!"', () => {
      return request(server).get('/').expect(200).expect('Hello World!');
    });
  });

  // Teste para verificar o comportamento quando a aplicação está sob carga
  describe('Teste de performance', () => {
    it('deve responder em menos de 500ms', async () => {
      const startTime = Date.now();
      await request(server).get('/');
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      expect(responseTime).toBeLessThan(500);
    });
  });

  // Teste para verificar o comportamento em caso de erro
  describe('Teste de comportamento de erro', () => {
    it('deve retornar 404 para rota inexistente', () => {
      return request(server).get('/rota-que-nao-existe').expect(404);
    });
  });

  // Teste para verificar headers e status code
  describe('Headers e status code', () => {
    it('deve retornar o Content-Type correto', async () => {
      const response = await request(server).get('/');

      expect(response.header['content-type']).toContain('text/html');
      expect(response.statusCode).toBe(200);
    });
  });

  // Category
  describe('Exemplo de CRUD completo: Category', () => {
    const categoryDto = {
      name: 'Categoria Teste',
    };

    let id: number;

    it('Deve criar uma nova categoria (POST)', async () => {
      const response = await request(server)
        .post('/categories')
        .send(categoryDto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(categoryDto.name);

      id = response.body.id;
    });

    it('Deve recuperar a categoria criado (GET)', async () => {
      const response = await request(server)
        .get(`/categories/${id}`)
        .expect(200);

      expect(response.body.id).toBe(id);
      expect(response.body.name).toBe(categoryDto.name);
    });

    it('Deve listar todos as categorias (GET)', async () => {
      const response = await request(server).get('/categories').expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('Deve remover a categoria (DELETE)', async () => {
      const response = await request(server)
        .delete(`/categories/${id}`)
        .expect(200);

      expect(response.body).toHaveProperty('affected');
      expect(response.body.affected).toBe(1);
    });
  });

  // Device
  describe('Exemplo de CRUD completo: Device', () => {
    const deviceDto = {
      category_id: 1,
      color: 'Azul',
      part_number: 10,
    };

    let id: number;

    it('Deve criar uma novo Device (POST)', async () => {
      const response = await request(server)
        .post('/devices')
        .send(deviceDto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.color).toBe(deviceDto.color);

      id = response.body.id;
    });

    it('Deve recuperar o device criado (GET)', async () => {
      const response = await request(server).get(`/devices/${id}`).expect(200);

      expect(response.body.id).toBe(id);
      expect(response.body.color).toBe(deviceDto.color);
    });

    it('Deve listar todos os devices (GET)', async () => {
      const response = await request(server).get('/devices').expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('Deve remover o device (DELETE)', async () => {
      const response = await request(server)
        .delete(`/devices/${id}`)
        .expect(200);

      expect(response.body).toHaveProperty('affected');
      expect(response.body.affected).toBe(1);
    });
  });
});
