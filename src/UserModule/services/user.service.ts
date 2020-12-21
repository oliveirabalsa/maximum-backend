import { UserDTO, UserRO } from '../dtos/user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async all(): Promise<UserRO[]> {
    const users = await this.userRepository.find();
    return users.map((user) => user.toResponseObject(false));
  }
  async login(user: UserDTO): Promise<UserRO> {
    const { username, password } = user;
    const userResponse = await this.userRepository.findOne({
      where: { username },
    });
    const hash = userResponse.password;
    if (!user || password! != hash) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      );
    }
    return userResponse.toResponseObject();
  }
  async register(user: UserDTO): Promise<UserRO> {
    let { username, password } = user;
    let userResponse = await this.userRepository.findOne({
      where: { username },
    });
    if (userResponse) {
      throw new HttpException('User already exists', HttpStatus.BAD_GATEWAY);
    }
    password = await bcrypt.hash(password, 10);

    await this.userRepository.create(user);
    await this.userRepository.save(user);
    userResponse = await this.userRepository.findOne({
      where: { username },
    });
    return userResponse.toResponseObject(false);
  }
}
