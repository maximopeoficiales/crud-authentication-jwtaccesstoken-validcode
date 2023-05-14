import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsPositive, Min } from "class-validator";

export class FilterUsersDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty()
  limit: number;

  @IsOptional()
  @Min(0)
  @ApiProperty()
  offset: number;

  @IsOptional()
  @ApiProperty()
  firstName: string;

  @IsOptional()
  @ApiProperty()
  lastName: string;

  @IsOptional()
  @ApiProperty()
  isDeleted: string;
}
