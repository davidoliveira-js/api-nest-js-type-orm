import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateGiftCardDto {
  @IsString({ message: 'Informe um nome de gift card válido.' })
  @IsNotEmpty({ message: 'Informe um nome de gift card.' })
  name: string;

  @IsNumber({}, { message: 'Informe um preço válido' })
  @IsNotEmpty({ message: 'Informe um preço.' })
  price: number;

  @IsString({ message: 'Informe pin válido' })
  @IsNotEmpty({ message: 'Informe o pin.' })
  @Length(16)
  pin: string;

  // @IsDate({ message: 'Informe uma data de validade válida.' })
  // @IsNotEmpty({ message: 'Informe uma data de validade.' })
  // expiration_date: Date;
}
