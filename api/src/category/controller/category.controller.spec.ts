import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from '../service/category.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { NotFoundException } from '@nestjs/common';

describe('CategoryController', () => {
  let controller: CategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});


describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  // Mock para o serviço
  const mockCategoryService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: mockCategoryService,
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const createCategoryDto: CreateCategoryDto = {
        name: 'Nova Categoria',
      };

      const expectedResult = {
        id: 1,
        ...createCategoryDto,
      };

      jest.clearAllMocks();
      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      const result = await controller.create(createCategoryDto);

      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createCategoryDto);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const expectedCategories = [
        { id: 1, name: 'Categoria A' },
        { id: 2, name: 'Categoria B' },
        { id: 3, name: 'Categoria C' },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedCategories);

      const result = await controller.findAll();

      expect(result).toEqual(expectedCategories);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array if no categories exist', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a single category when it exists', async () => {
      const categoryId = '1';
      const expectedCategory = { id: 1, name: 'Categoria A' };

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedCategory);

      const result = await controller.findOne(categoryId);

      expect(result).toEqual(expectedCategory);
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });

    it('should propagate NotFoundException when category does not exist', async () => {
      const categoryId = '999';

      jest
        .spyOn(service, 'findOne')
        .mockRejectedValue(
          new NotFoundException(
            `Categoria com ID ${categoryId} não encontrada`,
          ),
        );

      await expect(controller.findOne(categoryId)).rejects.toThrow(
        NotFoundException,
      );
      expect(service.findOne).toHaveBeenCalledWith(999);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should remove a category successfully', async () => {
      const categoryId = '1';
      const expectedResult = { affected: 1 };

      jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);

      const result = await controller.remove(categoryId);

      expect(result).toEqual(expectedResult);
      expect(service.remove).toHaveBeenCalledWith(1);
      expect(service.remove).toHaveBeenCalledTimes(1);
    });

    it('should propagate NotFoundException when trying to remove non-existent category', async () => {
      const categoryId = '999';

      jest
        .spyOn(service, 'remove')
        .mockRejectedValue(
          new NotFoundException(
            `Categoria com ID ${categoryId} não encontrada`,
          ),
        );

      await expect(controller.remove(categoryId)).rejects.toThrow(
        NotFoundException,
      );
      expect(service.remove).toHaveBeenCalledWith(999);
      expect(service.remove).toHaveBeenCalledTimes(1);
    });
  });
