import { UserDTO, UserRO } from '../dtos/user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDTO } from '../dtos/loginUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async all(): Promise<UserRO[]> {
    const users = await this.userRepository.find({ relations: ['address'] });
    return users.map((user) => user.toResponseObject(false));
  }

  async login(user: CreateUserDTO): Promise<UserRO> {
    const { email } = user;
    const userResponse = await this.userRepository.findOne({
      where: { email },
    });

    if (!userResponse)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    const hash = userResponse.password;
    const isValid = await this.comparePassword(user.password, hash);

    if (!user || !isValid) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      );
    }
    return userResponse.toResponseObject();
  }

  async register(user: any): Promise<UserRO> {
    let { email, password } = user;
    let userResponse = await this.userRepository.findOne({
      where: { email },
    });
    password = await bcrypt.hash(password, 10);
    if (userResponse) {
      throw new HttpException('User already exists', HttpStatus.BAD_GATEWAY);
    }

    await this.userRepository.create({ ...user, password });
    await this.userRepository.save({ ...user, password });
    userResponse = await this.userRepository.findOne({
      where: { email },
    });
    return userResponse.toResponseObject(false);
  }

  private async comparePassword(attempt: string, hash: string) {
    const response = await bcrypt.compare(attempt, hash);
    return response;
  }
}
