export class ListGiftCardDto {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly price: number,
    readonly pin: string,
    readonly expirationDate: Date,
    readonly isAvailable: boolean
  ) {}
}
