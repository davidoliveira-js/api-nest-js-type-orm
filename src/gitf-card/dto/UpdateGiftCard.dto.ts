import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateGiftCardDto {
  @IsBoolean({ message: 'informe um dado válido' })
  @IsOptional()
  isAvailable: boolean;
}
