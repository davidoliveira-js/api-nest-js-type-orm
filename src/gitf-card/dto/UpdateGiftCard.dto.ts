import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateGiftCardDto {
  @IsBoolean({ message: 'Informe um dado válido' })
  @IsOptional()
  isAvailable: boolean;

  @IsNumber({}, { message: 'Informe um preço válido.' })
  @IsOptional()
  price: number;
}
