import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './UserModule/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressModule } from './AddressModule/address.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, AddressModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
