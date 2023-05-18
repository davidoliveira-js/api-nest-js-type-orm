import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getAll(): Promise<import("./dto/ListUsers.dto").ListUserDto[]>;
    getOneById(id: string, userRoles: string, req: any): Promise<import("./dto/ListUsers.dto").ListUserDto>;
    create(data: CreateUserDto): Promise<import("../core/http/nest-response").NestResponse>;
    update(data: UpdateUserDto, id: string, userRoles: any, req: any): Promise<void>;
    delete(id: string): Promise<void>;
}
