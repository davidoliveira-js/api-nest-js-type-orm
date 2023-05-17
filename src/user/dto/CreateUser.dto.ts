import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { UniqueUserName } from '../uniqueUserName';
import { Role } from 'src/enums/role.enum';

export class CreateUserDto {
  // @UniqueUserName({
  //   message: 'Este nome de usuário já está sendo utilizado.',
  // })
  @IsString({ message: 'Informe um nome de usuário válido.' })
  @IsNotEmpty({ message: 'Informe um nome de usuário.' })
  username: string;

  @IsEmail({}, { message: 'Informe um email válido' })
  @IsNotEmpty({ message: 'Informe o campo email.' })
  @IsEmail()
  email: string;

  @IsString({ message: 'Informe uma senha válida.' })
  @IsNotEmpty({ message: 'Informe uma senha.' })
  @Length(6, 8, {
    message: 'A senha deve conter entre 6 e 8 catacteres.',
  })
  password: string;

  @IsNumber({}, { message: 'Informe créditos válidos.' })
  @IsNotEmpty({ message: 'Informe os créditos.' })
  credits: number;

  @IsEnum(Role, { message: 'Informe um cargo válido.' })
  role: Role;
}
