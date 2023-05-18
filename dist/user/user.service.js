"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcryptjs");
const user_entity_1 = require("./user.entity");
const ListUsers_dto_1 = require("./dto/ListUsers.dto");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async hashPassword(password) {
        const saltRounds = 12;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }
    async findAllUsers() {
        const data = await this.userRepository.find();
        const users = data.map((user) => {
            const { acquisitions, recharges } = user;
            return new ListUsers_dto_1.ListUserDto(user.id, user.username, user.email, user.credits, acquisitions.map((acquisition) => {
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
            }), recharges.map((recharge) => {
                return {
                    id: recharge.id,
                    value: recharge.value,
                    status: recharge.status,
                };
            }));
        });
        return users;
    }
    async findOneUserById(userId) {
        const data = await this.userRepository.findOneBy({ id: userId });
        if (!data) {
            throw new common_1.NotFoundException();
        }
        const { acquisitions, recharges } = data;
        const user = new ListUsers_dto_1.ListUserDto(data.id, data.username, data.email, data.credits, acquisitions.map((acquisition) => {
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
        }), recharges.map((recharge) => {
            return {
                id: recharge.id,
                value: recharge.value,
                status: recharge.status,
            };
        }));
        return user;
    }
    async getOneUserById(userId) {
        return await this.userRepository.findOneBy({ id: userId });
    }
    async findOneUserByUsername(username) {
        const data = await this.userRepository.findOneBy({
            username: username,
        });
        return data;
    }
    async createUser(data) {
        data.password = await this.hashPassword(data.password);
        const { id } = await this.userRepository.save(data);
        return id;
    }
    async updateUser(userId, data) {
        const updatedUser = (await this.userRepository.update(userId, data)).affected;
        if (!updatedUser) {
            throw new common_1.NotFoundException();
        }
        return;
    }
    async updateCredits(userId, userCredits, addedCredits) {
        const credits = userCredits + addedCredits;
        await this.userRepository.update(userId, { credits: credits });
    }
    async deleteUser(userId) {
        const deletedUser = (await this.userRepository.delete(userId))
            .affected;
        if (!deletedUser) {
            throw new common_1.NotFoundException();
        }
        return;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map