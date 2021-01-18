import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/UserModule/entities/user.entity';
import { getConnection, Repository } from 'typeorm';
import { AddressDTO } from '../dtos/address.dto';
import { Address } from '../entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async save(address: AddressDTO) {
    const { user } = address;
    const userExists = await this.userRepository.findOne(user);

    if (!userExists)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    const createdAddress = await this.addressRepository.save(address);
    await this.userRepository.save({
      ...userExists,
      address: createdAddress,
    });
    return createdAddress;
  }
  async list() {
    return await this.addressRepository.find({ relations: ['user'] });
  }

  async update(address: AddressDTO, id: number) {
    const addressToUpdate = await this.addressRepository.findOne(id);

    if (!addressToUpdate)
      throw new HttpException('Address not found', HttpStatus.BAD_REQUEST);

    const addressUpdated = { ...addressToUpdate, ...address };

    return await this.addressRepository.save(addressUpdated);
  }

  async destroy(id: string) {
    const addressToRemove = await this.addressRepository.findOne(id);

    if (!addressToRemove)
      throw new HttpException('Address not found', HttpStatus.BAD_REQUEST);

    return await this.addressRepository.remove(addressToRemove);
  }
}
