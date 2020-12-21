import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../UserModule/controllers/user.controller';
import { UserEntity } from '../UserModule/entities/user.entity';
import { UserService } from '../UserModule/services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
