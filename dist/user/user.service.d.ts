import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { ListUserDto } from './dto/ListUsers.dto';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    hashPassword(password: string): Promise<string>;
    findAllUsers(): Promise<ListUserDto[]>;
    findOneUserById(userId: string): Promise<ListUserDto>;
    getOneUserById(userId: string): Promise<UserEntity>;
    findOneUserByUsername(username: string): Promise<UserEntity>;
    createUser(data: CreateUserDto): Promise<string>;
    updateUser(userId: string, data: UpdateUserDto): Promise<void>;
    updateCredits(userId: string, userCredits: number, addedCredits: number): Promise<void>;
    deleteUser(userId: string): Promise<void>;
}
