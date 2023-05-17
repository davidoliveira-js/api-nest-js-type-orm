import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getAll(): Promise<import("./dto/ListUsers.dto").ListUserDto[]>;
    getOneById(id: string): Promise<import("./dto/ListUsers.dto").ListUserDto>;
    create(data: CreateUserDto): Promise<import("../core/http/nest-response").NestResponse>;
    update(data: UpdateUserDto, id: string): Promise<void>;
    delete(id: string): Promise<void>;
}
