import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiTags } from "@nestjs/swagger";
import { MongoIdPipe } from "src/common/pipes/mongo-id.pipe";
import { FilterUsersDto } from "./dto/filter-user.dto";
import { JwtAuthGuard } from "src/iam/guards/jwt-auth.guard";
import { ValidAuthGuard } from "src/iam/guards/valid-auth.guard";

@ApiTags("User")
@UseGuards(JwtAuthGuard, ValidAuthGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("all")
  async findAll(@Query() params?: FilterUsersDto) {
    return await this.usersService.findAll(params);
  }
  @Post("create")
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get("one/:id")
  async findOne(@Param("id", MongoIdPipe) id: string) {
    return await this.usersService.findOne(id);
  }

  @Patch("update/:id")
  async update(@Param("id", MongoIdPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Patch("delete/:id")
  async delete(@Param("id", MongoIdPipe) id: string) {
    return await this.usersService.delete(id);
  }
}
