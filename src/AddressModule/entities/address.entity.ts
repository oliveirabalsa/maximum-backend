import { UserEntity } from 'src/UserModule/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('address')
export class Address {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => UserEntity, (user: UserEntity) => user.address)
  @JoinColumn()
  public user: UserEntity;

  @Column({ nullable: false, type: 'text' })
  street: string;

  @Column({ nullable: false, type: 'text' })
  number: string;

  @Column({ nullable: false, type: 'text' })
  neighborhood: string;

  @Column({ nullable: false, type: 'text' })
  postal_code: string;

  @Column({ nullable: false, type: 'text' })
  city: string;

  @Column({ nullable: false, type: 'text' })
  state: string;

  @Column({ nullable: true, type: 'text' })
  complement?: string;
}
