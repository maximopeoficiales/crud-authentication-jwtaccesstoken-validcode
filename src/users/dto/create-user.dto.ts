import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength, MinLength, IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto {
  @IsString({ message: "El email debe contener caractéres validos" })
  @IsEmail({}, { message: "Este campo debe ser un email válido" })
  @ApiProperty()
  readonly email: string;

  @IsString({ message: "La contraseña debe contener caractéres validos" })
  @MinLength(6)
  @MaxLength(50)
  @IsNotEmpty({ message: "La contraseña es un campo requerido" })
  /** Expresión regular para una contraseña segura */
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "La contraseña debe tener letas mayúsculas, minusculas y numeros",
  })
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty({ message: "El nombres son requeridos" })
  @ApiProperty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty({ message: "Los apellidos son requeridos" })
  @ApiProperty()
  readonly lastName: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  role: string;

  @IsOptional()
  @ApiProperty()
  readonly isActive: boolean = true;

  @IsOptional()
  @ApiProperty()
  readonly isLocked: boolean;

  @IsOptional()
  @ApiProperty()
  readonly isDeleted: boolean;
}
