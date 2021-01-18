import { AuthGuard } from 'src/AuthModule/auth.guard';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserDTO } from '../dtos/user.dto';
import { UserService } from '../services/user.service';
import { CreateUserDTO } from '../dtos/loginUser.dto';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(new AuthGuard())
  @Get('user')
  async all() {
    return await this.userService.all();
  }

  @Post('/login')
  async login(@Body() user: CreateUserDTO) {
    return await this.userService.login(user);
  }

  @Post('register')
  async register(@Body() user: UserDTO) {
    return await this.userService.register(user);
  }
}
