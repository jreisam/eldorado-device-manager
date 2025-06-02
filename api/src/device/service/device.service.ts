import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from '../entity/device.entity';
import { DeviceDto } from '../dto/device.dto';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
  ) {}

  create(createDeviceDto: DeviceDto) {
    const device = this.deviceRepository.create(createDeviceDto);
    return this.deviceRepository.save(device);
  }

  findAll() {
    return this.deviceRepository.find({ relations: ['category'] });
  }

  findOne(id: number) {
    return this.deviceRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  remove(id: number) {
    return this.deviceRepository.delete(id);
  }
}
