import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class SignInDto {
  @IsNotEmpty({ message: "Por favor ingrese un email y/o contraseña válida" })
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty({ message: "Por favor ingrese un email y/o contraseña válida" })
  @ApiProperty()
  readonly password: string;

  @IsOptional()
  @ApiProperty()
  readonly ip?: string;

  /** Campo para capturar el ID del usuario logueado desde el LocalStrategy */
  @IsOptional()
  @ApiProperty()
  id?: string;

  /** Campo para capturar el role del usuario logueado desde el LocalStrategy */
  @IsOptional()
  @ApiProperty()
  role?: string;
}
