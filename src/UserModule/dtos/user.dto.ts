import { IsNotEmpty, IsString } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UserRO {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  created_at: Date;

  @IsNotEmpty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  token?: string;
}
