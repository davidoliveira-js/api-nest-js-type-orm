export declare class ListAcquisitionDTO {
    readonly id: string;
    readonly price: number;
    readonly giftcard: {
        id: string;
        name: string;
    };
    readonly user: {
        id: string;
        username: string;
    };
    constructor(id: string, price: number, giftcard: {
        id: string;
        name: string;
    }, user: {
        id: string;
        username: string;
    });
}
