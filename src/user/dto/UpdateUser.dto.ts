import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'Informe um nome de usuário válido.' })
  @IsNotEmpty({ message: 'Informe um nome de usuário.' })
  @IsOptional()
  username: string;
}
