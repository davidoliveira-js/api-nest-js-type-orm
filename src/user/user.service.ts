import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { ListUserDto } from './dto/ListUsers.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async findAllUsers() {
    const data = await this.userRepository.find();
    const users = data.map((user) => {
      const { acquisitions, recharges } = user;

      return new ListUserDto(
        user.id,
        user.username,
        user.email,
        user.credits,
        acquisitions.map((acquisition) => {
          const { giftCard } = acquisition;
          return {
            id: acquisition.id,
            price: acquisition.price,
            giftCard: {
              id: giftCard.id,
              name: giftCard.name,
              pin: giftCard.pin,
            },
          };
        }),
        recharges.map((recharge) => {
          return {
            id: recharge.id,
            value: recharge.value,
            status: recharge.status,
          };
        })
      );
    });
    return users;
  }

  async findOneUserById(userId: string) {
    const data = await this.userRepository.findOneBy({ id: userId });
    const { acquisitions, recharges } = data;
    const user = new ListUserDto(
      data.id,
      data.username,
      data.email,
      data.credits,
      acquisitions.map((acquisition) => {
        const { giftCard } = acquisition;
        return {
          id: acquisition.id,
          price: acquisition.price,
          giftCard: {
            id: giftCard.id,
            name: giftCard.name,
            pin: giftCard.pin,
          },
        };
      }),
      recharges.map((recharge) => {
        return {
          id: recharge.id,
          value: recharge.value,
          status: recharge.status,
        };
      })
    );
    return user;
  }

  async getOneUserById(userId: string) {
    return await this.userRepository.findOneBy({ id: userId });
  }

  async findOneUserByUsername(username: string) {
    const data = await this.userRepository.findOneBy({
      username: username,
    });
    return data;
  }

  async createUser(data: CreateUserDto) {
    data.password = await this.hashPassword(data.password);
    const { id } = await this.userRepository.save(data);
    return id;
  }

  async updateUser(userId: string, data: UpdateUserDto) {
    return (await this.userRepository.update(userId, data)).affected;
  }

  async updateCredits(
    userId: string,
    userCredits: number,
    addedCredits: number
  ) {
    const user = new UpdateUserDto();
    user.credits = userCredits + addedCredits;
    await this.userRepository.update(userId, user);
  }

  async deleteUser(userId: string) {
    return (await this.userRepository.delete(userId)).affected;
  }
}
