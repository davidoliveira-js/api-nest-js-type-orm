import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRechargeDto {
  @IsString({ message: 'Informe um ID de usuário válido.' })
  @IsNotEmpty({ message: 'Informe um ID de usuário.' })
  userId: string;

  @IsNumber({}, { message: 'Informe um valor de recarga válido.' })
  @IsNotEmpty({ message: 'Informe um valor de recarga.' })
  value: number;
}
