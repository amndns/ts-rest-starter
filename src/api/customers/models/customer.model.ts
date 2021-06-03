import bcrypt from 'bcrypt';
import { IsNotEmpty } from 'class-validator';
import {
  BeforeInsert,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class Customer {
  @PrimaryGeneratedColumn('increment')
  public pk: number;

  @IsNotEmpty()
  @Column({ unique: true })
  @Generated('uuid')
  public id: string;

  @IsNotEmpty()
  @Column('varchar', { length: 255, name: 'first_name' })
  public firstName: string;

  @IsNotEmpty()
  @Column('varchar', { length: 255, name: 'last_name' })
  public lastName: string;

  @IsNotEmpty()
  @Column('varchar', { length: 255 })
  public email: string;

  @IsNotEmpty()
  @Column()
  public password: string;

  @BeforeInsert()
  public async hashPassword(): Promise<void> {
    this.password = await Customer.hashPassword(this.password);
  }

  public static hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return reject(err);
        }
        resolve(hash);
      });
    });
  }

  public static comparePassword(
    customer: Customer,
    password: string
  ): Promise<boolean> {
    return new Promise((resolve) => {
      bcrypt.compare(password, customer.password, (err, res) => {
        resolve(res === true);
      });
    });
  }
}

export default Customer;
