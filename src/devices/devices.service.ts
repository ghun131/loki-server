import { Injectable } from '@nestjs/common';
import { Device } from './device.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
  ) {}

  async findOne(id: string): Promise<Device> {
    return this.deviceRepository.findOne({ where: { id } });
  }
}
