import { ProfileEnum } from './../enum/profile.enum';
import { UserRO } from '../dtos/user.dto';
import { Column, CreateDateColumn, JoinColumn, OneToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { Entity } from 'typeorm/decorator/entity/Entity';
import * as jwt from 'jsonwebtoken';
import { Address } from 'src/AddressModule/entities/address.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({
    type: 'text',
    unique: true,
  })
  email: string;

  @Column('text')
  profile: ProfileEnum;

  @OneToOne(() => Address)
  @JoinColumn()
  public address?: Address;

  @Column({ nullable: true, type: 'text' })
  password?: string;

  @Column({ nullable: true, type: 'text' })
  cpf?: string;

  @Column({ nullable: true, type: 'text' })
  cnpj?: string;

  @Column('text')
  name: string;

  @Column({ nullable: true, type: 'text' })
  image?: string;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  toResponseObject(showToken = true): UserRO {
    const {
      id,
      created_at,
      email,
      token,
      profile,
      name,
      image,
      cpf,
      cnpj,
      description,
      address,
    } = this;
    const repsonseObject: UserRO = {
      id,
      created_at,
      email,
      profile,
      name,
      image,
      cpf,
      cnpj,
      description,
      address,
    };

    if (showToken) {
      repsonseObject.token = token;
    }
    return repsonseObject;
  }

  private get token() {
    const { id, email } = this;
    return jwt.sign(
      {
        id,
        email,
      },
      process.env.SECRET,
      { expiresIn: '7d' },
    );
  }
}
