import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/AuthModule/auth.guard';
import { AddressDTO } from '../dtos/address.dto';
import { AddressService } from '../services/address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @UseGuards(new AuthGuard())
  @Post()
  async save(@Body() address: AddressDTO) {
    return await this.addressService.save(address);
  }

  @UseGuards(new AuthGuard())
  @Get()
  async list() {
    return await this.addressService.list();
  }

  @UseGuards(new AuthGuard())
  @Put(':id')
  async update(@Body() address: AddressDTO, @Param() id: number) {
    return await this.addressService.update(address, id);
  }

  @UseGuards(new AuthGuard())
  @Delete(':id')
  async destroy(@Param() id: string) {
    return await this.addressService.destroy(id);
  }
}
