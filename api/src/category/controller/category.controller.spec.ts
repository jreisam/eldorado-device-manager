import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from '../service/category.service';
import { CategoryDto } from '../dto/category.dto';
import { NotFoundException } from '@nestjs/common';

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
      // Arrange
      const createCategoryDto: CategoryDto = {
        name: 'Nova Categoria',
      };

      const expectedResult = {
        id: 1,
        name: 'Nova Categoria',
        devices: [],
      };

      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      // Act
      const result = await controller.create(createCategoryDto);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createCategoryDto);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      // Arrange
      const expectedCategories = [
        { id: 1, name: 'Categoria A', devices: [] },
        { id: 2, name: 'Categoria B', devices: [] },
        { id: 3, name: 'Categoria C', devices: [] },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedCategories);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual(expectedCategories);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array if no categories exist', async () => {
      // Arrange
      jest.spyOn(service, 'findAll').mockResolvedValue([]);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual([]);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a single category when it exists', async () => {
      // Arrange
      const categoryId = '1';
      const expectedCategory = { id: 1, name: 'Categoria A', devices: [] };

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedCategory);

      // Act
      const result = await controller.findOne(categoryId);

      // Assert
      expect(result).toEqual(expectedCategory);
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });

    it('should propagate NotFoundException when category does not exist', async () => {
      // Arrange
      const categoryId = '999';

      jest
        .spyOn(service, 'findOne')
        .mockRejectedValue(
          new NotFoundException(
            `Categoria com ID ${categoryId} não encontrada`,
          ),
        );

      // Act & Assert
      await expect(controller.findOne(categoryId)).rejects.toThrow(
        NotFoundException,
      );
      expect(service.findOne).toHaveBeenCalledWith(999);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should remove a category successfully', async () => {
      // Arrange
      const categoryId = '1';
      const expectedResult = { raw: null, affected: 1 };

      jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);

      // Act
      const result = await controller.remove(categoryId);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(service.remove).toHaveBeenCalledWith(1);
      expect(service.remove).toHaveBeenCalledTimes(1);
    });

    it('should propagate NotFoundException when trying to remove non-existent category', async () => {
      // Arrange
      const categoryId = '999';

      jest
        .spyOn(service, 'remove')
        .mockRejectedValue(
          new NotFoundException(
            `Categoria com ID ${categoryId} não encontrada`,
          ),
        );

      // Act & Assert
      await expect(controller.remove(categoryId)).rejects.toThrow(
        NotFoundException,
      );
      expect(service.remove).toHaveBeenCalledWith(999);
      expect(service.remove).toHaveBeenCalledTimes(1);
    });
  });
});
