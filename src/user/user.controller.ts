import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '@app/dto/createUser.dto';
import { UserResponseInterface } from '@app/user/types/userResponse.interface';
import { LoginUserDto } from '@app/dto/loginUser.dto';
import { User } from '@app/decorators/user.decorator';
import { UserEntity } from './user.entity';
import { AuthGuard } from '@app/guards/auth.guard';
import { UpdateUserDto } from '@app/dto/updateUserDto';

@Controller('user/')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('create')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async currentUser(@User() user: UserEntity): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user);
  }

  @Put('user')
  @UseGuards(AuthGuard)
  async updateUser(
    @User('id') currentUserId: number,
    @Body() updateuser: UpdateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.updateUser(currentUserId, updateuser);
    return this.userService.buildUserResponse(user);
  }
}
