export declare class ListGiftCardAdminDto {
    readonly id: string;
    readonly name: string;
    readonly price: number;
    readonly pin: string;
    readonly expirationDate: Date;
    readonly isAvailable: boolean;
    constructor(id: string, name: string, price: number, pin: string, expirationDate: Date, isAvailable: boolean);
}
