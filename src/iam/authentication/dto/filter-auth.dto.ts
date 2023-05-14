import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsPositive, Min } from "class-validator";

export class FilterAuthDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty()
  limit?: number;

  @IsOptional()
  @Min(0)
  @ApiProperty()
  offset?: number;

  @IsOptional()
  @ApiProperty()
  user?: string;

  @IsOptional()
  @ApiProperty()
  ip?: string;

  @IsOptional()
  @ApiProperty()
  saveDevice?: boolean;

  @IsOptional()
  @ApiProperty()
  authStatus?: boolean;

  @IsOptional()
  @ApiProperty()
  accessToken?: string;
}
