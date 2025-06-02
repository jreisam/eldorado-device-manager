import { Test, TestingModule } from '@nestjs/testing';
import { DeviceController } from './device.controller';
import { NotFoundException } from '@nestjs/common';
import { DeviceService } from '../service/device.service';
import { Device } from '../entity/device.entity';
import { DeviceDto } from '../dto/device.dto';

describe('DeviceController', () => {
  let controller: DeviceController;
  let service: DeviceService;

  const mockDeviceService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockDevice: Device = {
    id: 1,
    color: 'Black',
    category: {
      id: 1,
      name: 'Test Category',
      devices: [],
    },
    category_id: 1,
    part_number: 10,
  };

  const mockDevices: Device[] = [
    mockDevice,
    {
      id: 2,
      color: 'White',
      category: {
        id: 1,
        name: '',
        devices: [],
      },
      category_id: 1,
      part_number: 10,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeviceController],
      providers: [
        {
          provide: DeviceService,
          useValue: mockDeviceService,
        },
      ],
    }).compile();

    controller = module.get<DeviceController>(DeviceController);
    service = module.get<DeviceService>(DeviceService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of devices', async () => {
      // Arrange
      jest.spyOn(service, 'findAll').mockResolvedValue(mockDevices);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual(mockDevices);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a single device by id', async () => {
      // Arrange
      jest.spyOn(service, 'findOne').mockResolvedValue(mockDevice);

      // Act
      const result = await controller.findOne('1');

      // Assert
      expect(result).toEqual(mockDevice);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when device is not found', async () => {
      // Arrange
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      // Act & Assert
      await expect(controller.findOne('999')).rejects.toThrow(
        NotFoundException,
      );
      expect(service.findOne).toHaveBeenCalledWith(999);
    });
  });

  describe('create', () => {
    it('should create a new device', async () => {
      // Arrange
      const createDeviceDto: DeviceDto = {
        color: 'Red',
        category_id: 1,
        part_number: 10,
      };

      const newDevice = { ...mockDevice, ...createDeviceDto, id: 3 };
      jest.spyOn(service, 'create').mockResolvedValue(newDevice);

      // Act
      const result = await controller.create(createDeviceDto);

      // Assert
      expect(result).toEqual(newDevice);
      expect(service.create).toHaveBeenCalledWith(createDeviceDto);
    });
  });

  describe('remove', () => {
    it('should remove a device', async () => {
      // Arrange
      jest
        .spyOn(service, 'remove')
        .mockResolvedValue({ raw: null, affected: 1 });

      // Act
      const result = await controller.remove('1');

      // Assert
      expect(result).toEqual({ affected: 1 });
      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when trying to remove non-existent device', async () => {
      // Arrange
      jest
        .spyOn(service, 'remove')
        .mockResolvedValue({ raw: null, affected: 0 });

      // Act & Assert
      await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
      expect(service.remove).toHaveBeenCalledWith(999);
    });
  });
});
