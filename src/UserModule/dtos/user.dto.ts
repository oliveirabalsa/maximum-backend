import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProfileEnum } from '../enum/profile.enum';
import { AddressDTO } from 'src/AddressModule/dtos/address.dto';

export class UserDTO {
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  // enum (BUYER, SELLER, DELIVERY)
  @IsNotEmpty()
  @IsEnum(ProfileEnum)
  profile: ProfileEnum;

  @IsString()
  @IsOptional()
  cpf?: string;

  @IsString()
  @IsOptional()
  cnpj?: string;

  // Caso seja vendedor o endereco do local
  // Relationship with address entity.
  @IsOptional()
  address?: AddressDTO;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UserRO {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  created_at: Date;

  @IsNotEmpty()
  @IsString()
  email: string;

  // enum (BUYER, SELLER, DELIVERY)
  @IsNotEmpty()
  @IsEnum(ProfileEnum)
  profile: ProfileEnum;

  @IsString()
  @IsOptional()
  cpf?: string;

  @IsString()
  @IsOptional()
  cnpj?: string;

  // Caso seja vendedor o endereco do local
  // Relationship with address entity.
  @IsOptional()
  address?: AddressDTO;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  token?: string;
}
