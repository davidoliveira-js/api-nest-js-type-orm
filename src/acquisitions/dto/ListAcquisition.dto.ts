export class ListAcquisitionDTO {
  constructor(
    readonly id: string,
    readonly price: number,
    readonly giftcard: { id: string; name: string },
    readonly user: { id: string; username: string }
  ) {}
}
