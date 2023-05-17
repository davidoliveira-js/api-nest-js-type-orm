import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAcquisitionDto {
  @IsString({ message: 'Informe um ID de usuário válido.' })
  @IsNotEmpty({ message: 'Informe um ID de usuário.' })
  userId: string;

  @IsString({ message: 'Informe um ID de gift card válido.' })
  @IsNotEmpty({ message: 'Informe um ID de gift card.' })
  giftCardId: string;
}
