import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateAuthDto {
  @IsOptional()
  @ApiProperty()
  readonly accessToken: string;

  @IsOptional()
  @ApiProperty()
  readonly refreshToken: string;

  @IsOptional()
  @ApiProperty()
  readonly ip: string;

  @IsOptional()
  @ApiProperty()
  readonly saveDevice?: boolean;

  @IsOptional()
  @ApiProperty()
  readonly authStatus?: boolean;

  @IsOptional()
  @ApiProperty()
  readonly code?: string;

  @IsOptional()
  @ApiProperty()
  validAuthToken?: string;

  @IsOptional()
  @ApiProperty()
  validAuthExpire?: Date;

  @IsOptional()
  @ApiProperty()
  user: string;
}
