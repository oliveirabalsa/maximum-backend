import { UserEntity } from 'src/UserModule/entities/user.entity';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddressDTO {
  @IsNotEmpty()
  @IsString()
  user: UserEntity;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsString()
  number: string;

  @IsNotEmpty()
  @IsString()
  neighborhood: string;

  @IsNotEmpty()
  @IsString()
  postal_code: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsOptional()
  @IsString()
  complement?: string;
}
