import { UserEntity } from './../UserModule/entities/user.entity';
import { AddressService } from './services/address.service';
import { Address } from './entities/address.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressController } from './controllers/address.controller';
import { UserService } from 'src/UserModule/services/user.service';
import { UserModule } from 'src/UserModule/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Address, UserEntity]), UserModule],
  controllers: [AddressController],
  providers: [AddressService, UserService],
})
export class AddressModule {}
