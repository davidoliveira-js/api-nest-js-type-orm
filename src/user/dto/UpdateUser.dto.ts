import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'Informe um nome de usuário válido.' })
  @IsNotEmpty({ message: 'Informe um nome de usuário.' })
  @IsOptional()
  username: string;

  @IsEmail({}, { message: 'Informe um email válido' })
  @IsNotEmpty({ message: 'Informe o campo email.' })
  @IsOptional()
  email: string;

  @IsString({ message: 'Informe uma senha válida.' })
  @IsNotEmpty({ message: 'Informe uma senha.' })
  @Length(6, 8, {
    message: 'A senha deve conter entre 6 e 8 catacteres.',
  })
  @IsOptional()
  password: string;

  @IsNumber({}, { message: 'Informe créditos válidos.' })
  @IsNotEmpty({ message: 'Informe os créditos.' })
  @IsOptional()
  credits: number;
}
